const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'index.html'),'utf8');
const {boardFor,solution,masks,readWheel,FULL}=vm.runInNewContext(source.match(/<script id="engine">([\s\S]+?)<\/script>/)[1]+'\n({boardFor,solution,masks,readWheel,FULL})');
test('120 deterministic boards are scrambled and solvable',()=>{
 for(let i=0;i<120;i++){
  const seed='snapshot-'+i, rpm=i%100, board=boardFor(seed,rpm);
  assert.notEqual(board,FULL);
  assert.equal(boardFor(seed,rpm),board);
  assert.equal(solution(board).reduce((b,cell)=>b^masks[cell],board),FULL);
 }
});
test('wheel speed changes the puzzle and idle hardware is valid',()=>{
 assert.notEqual(boardFor('same',0),boardFor('same',90));
 assert.equal(readWheel(sample,now).rpm,0);
});
const now=Date.UTC(2026,10,5), iso=new Date(now).toISOString();
const sample={schemaVersion:1,installationId:'test',generatedAt:iso,measurement:{observedAt:iso,receivedAt:iso,rpmMilli:0,staleAfterSeconds:120,coreStatus:'IDLE',freshness:'online',provenance:'hardware'}};
test('rejects unavailable, invalid, simulated and expired readings',()=>{
 for(const data of [{...sample,status:'unavailable'},{...sample,schemaVersion:2},...['simulated','replay'].map(provenance=>({...sample,measurement:{...sample.measurement,provenance}})),{...sample,measurement:{...sample.measurement,coreStatus:'COUNTER_FAULT'}},{...sample,generatedAt:'bad'}]) assert.throws(()=>readWheel(data,now));
 assert.throws(()=>readWheel(sample,now+120000));
});
