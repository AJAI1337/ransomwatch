import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalize,dedup} from './collect.mjs';
test('normalizes both public feed schemas and rejects invalid dates',()=>{
 const a=normalize({posts:[{post_title:'Example Co',group_name:'Akira',discovered:'2026-10-25T01:02:03Z'}]},'RansomLook');
 const b=normalize([{victim:'Example Co.',group:'akira',discovered:'2026-10-25 01:02:04',country:'MY',activity:'Technology',url:'https://www.ransomware.live/id/abc'}],'Ransomware.live');
 assert.equal(b[0].country,'Malaysia');const merged=dedup([...a,...b]);assert.equal(merged.length,1);assert.equal(merged[0].sources.length,2);assert.equal(merged[0].sector,'Technology');assert.equal(merged[0].date,a[0].date);assert.equal(merged[0].reports['Ransomware.live'],'https://www.ransomware.live/id/abc');assert.equal(normalize([{victim:'Invalid',group:'x',discovered:'bad'}],'test').length,0);
});
test('keeps different groups distinct and never forwards arbitrary URLs',()=>{
 const rows=normalize([{victim:'Example',group:'one',discovered:'2026-10-25',url:'javascript:alert(1)'},{victim:'Example',group:'two',discovered:'2026-10-25',url:'https://evil.example'}],'test');assert.equal(dedup(rows).length,2);assert.deepEqual(rows[0].reports,{});assert.deepEqual(rows[1].reports,{});
});
