#!/usr/bin/env python3
"""Package the Remotion project and publish the user-requested film downloads."""
from pathlib import Path
import argparse, hashlib, json, os, subprocess, tempfile, urllib.request, zipfile

root=Path(__file__).resolve().parents[1]
os.chdir(root)
parser=argparse.ArgumentParser();parser.add_argument('--source-only',action='store_true');args=parser.parse_args()
def git(*a,env=None,input=None):
    p=subprocess.run(['git',*a],text=True,capture_output=True,env=env,input=input)
    if p.returncode:raise RuntimeError(p.stderr)
    return p.stdout.strip()
def publish(branch,files,message,base='main'):
    exists=git('ls-remote','origin',f'refs/heads/{branch}')
    git('fetch','origin',branch if exists else base);parent=git('rev-parse','FETCH_HEAD')
    fd,index=tempfile.mkstemp(prefix='recool-editorial-',suffix='.index',dir='/tmp');os.close(fd);os.unlink(index)
    env=dict(os.environ,GIT_INDEX_FILE=index)
    try:
        git('read-tree',parent,env=env)
        for source,dest in files:
            assert source.is_file() and source.stat().st_size<100*1024*1024,str(source)
            oid=git('hash-object','-w',str(source));git('update-index','--add','--cacheinfo',f'100644,{oid},{dest}',env=env)
        tree=git('write-tree',env=env)
        commit=git('-c','user.name=Codex','-c','user.email=codex@users.noreply.github.com','commit-tree',tree,'-p',parent,input=message+'\n')
        old=subprocess.run(['git','rev-parse','--verify',f'refs/heads/{branch}'],text=True,capture_output=True)
        git('update-ref',f'refs/heads/{branch}',commit,old.stdout.strip() if old.returncode==0 else '0'*40)
        git('push','origin',f'refs/heads/{branch}:refs/heads/{branch}')
        assert git('ls-remote','origin',f'refs/heads/{branch}').split()[0]==commit
        print('Published',branch,commit,flush=True);return commit
    finally:Path(index).unlink(missing_ok=True)

paths=[Path(p) for p in ['README.md','package.json','package-lock.json','remotion.config.ts','tsconfig.json','src/Root.tsx','src/index.ts','src/components/CaptionsAndAudio.tsx','src/components/motion.ts','scripts/prepare-assets.mjs','scripts/check-editorial.mjs','scripts/render-editorial-stills.mjs','scripts/cloud-setup.sh','scripts/publish-editorial.py','docs/ASSET-SOURCES.json','docs/production/CLOUD-START.md']]
for folder in ['src/editorial','src/data','public/assets/editorial','public/assets/fonts','docs/references']:
    paths.extend(p for p in Path(folder).rglob('*') if p.is_file() and p.name!='assets.generated.json')
paths.extend(Path('public/assets')/n for n in ['recool-logo.png','recool-60ml.png','recool-150ml.png','recool-merged.mp4','macro-skin-generated.png'])
paths=sorted(set(paths))
archive=Path('out/parachute-recool-remotion-project.zip')
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=5) as z:
    for p in paths:z.write(p,'parachute-recool/'+p.as_posix())
with zipfile.ZipFile(archive) as z:assert z.testzip() is None
assert archive.stat().st_size<100*1024*1024
state_path=Path('out/editorial-published.json')
state=json.loads(state_path.read_text()) if state_path.exists() else {}
digest=hashlib.sha256()
for p in paths:digest.update(p.as_posix().encode());digest.update(p.read_bytes())
source_digest=digest.hexdigest()
if not state.get('source') or state.get('source_digest')!=source_digest:
    state['source']=publish('recool-remotion-final',[(root/p,p.as_posix()) for p in paths],'Build full editorial Parachute ReCool film entirely in Remotion')
    state['source_digest']=source_digest
    state_path.write_text(json.dumps(state,indent=2)+'\n')
if args.source_only:raise SystemExit(0)

master=Path('out/parachute-recool-final.mp4');preview=Path('out/parachute-recool-final-720p.mp4')
patch=Path('out/editorial-humidity-patch.mp4')
if patch.exists() and not state.get('moisture_corrected'):
    patch_meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(patch)],text=True))
    assert int(patch_meta['streams'][0]['nb_frames'])==320
    fixed=Path('out/parachute-recool-final-corrected.mp4')
    filt='[0:v]split=2[a][b];[a]trim=end_frame=600,setpts=PTS-STARTPTS[v0];[1:v]setpts=PTS-STARTPTS[v1];[b]trim=start_frame=920,setpts=PTS-STARTPTS[v2];[v0][v1][v2]concat=n=3:v=1:a=0[joined];[joined]setpts=N/(30*TB)[v]'
    print('Finishing the corrected evaporation motion',flush=True)
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-filter_complex_threads','2','-threads','2','-i',str(master),'-threads','2','-i',str(patch),'-filter_complex',filt,'-map','[v]','-an','-c:v','libx264','-preset','veryfast','-crf','18','-threads','4','-r','30','-video_track_timescale','15360','-pix_fmt','yuv420p','-movflags','+faststart',str(fixed)],check=True)
    master.rename('out/parachute-recool-final-before-moisture-fix.mp4');fixed.rename(master)
    state['moisture_corrected']=True;state_path.write_text(json.dumps(state,indent=2)+'\n')
meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(master)],text=True))
v=next(s for s in meta['streams'] if s['codec_type']=='video')
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_frames']))==(1920,1080,'30/1',5400)
assert v['avg_frame_rate']=='30/1'
assert abs(float(meta['format']['duration'])-180)<.001
assert not any(s['codec_type']=='audio' for s in meta['streams'])
print('Decoding the full master',flush=True)
subprocess.run(['ffmpeg','-v','error','-xerror','-threads','2','-i',str(master),'-f','null','-'],check=True)
print('Creating the full-length 720p copy',flush=True)
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-threads','2','-i',str(master),'-vf','scale=1280:720','-an','-c:v','libx264','-preset','veryfast','-crf','23','-threads','4','-pix_fmt','yuv420p','-movflags','+faststart',str(preview)],check=True)
pmeta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(preview)],text=True))
assert int(pmeta['streams'][0]['nb_frames'])==5400 and abs(float(pmeta['format']['duration'])-180)<.001
deliverables=[master,preview,archive]
commit=publish('recool-video-downloads',[(root/p,'deliverables/'+p.name) for p in deliverables],'Deliver rebuilt 180-second Remotion film, full-length preview and editable source project')
urls={}
for p in deliverables:
    url=f'https://github.com/017safwansd-glitch/otws5/raw/{commit}/deliverables/{p.name}'
    expected=hashlib.sha256(p.read_bytes()).hexdigest();h=hashlib.sha256();size=0
    with urllib.request.urlopen(url,timeout=60) as r:
        assert r.status==200
        while chunk:=r.read(1024*1024):h.update(chunk);size+=len(chunk)
    assert h.hexdigest()==expected and size==p.stat().st_size
    urls[p.name]={'url':url,'bytes':size,'download_verified':True}
    print('Verified download',p.name,size,flush=True)
state.update(delivery=commit,files=urls,duration=180,width=1920,height=1080,fps=30)
state_path.write_text(json.dumps(state,indent=2)+'\n')
print(json.dumps(state),flush=True)
