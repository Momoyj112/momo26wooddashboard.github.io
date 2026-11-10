const $=s=>document.querySelector(s);
function fit(){const scale=Math.min(innerWidth/1334,innerHeight/960);$('#dashboard').style.transform=`scale(${scale})`}
addEventListener('resize',fit);fit();
function updateClock(){const d=new Date();$('#clock').textContent=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`}
updateClock();setInterval(updateClock,1000);
document.querySelectorAll('.digits').forEach(el=>{el.innerHTML=String(el.dataset.value).split('').map(n=>`<span>${n}</span>`).join('')});
const goods=[['已成交','这里是一个树苗的名称这里是一个树苗的名称','12,345,567','2026-10-10 14:00 结束'],['已成交','这里是一个树苗的名称这里是一个树苗的名称','12,345,567','2026-10-10 14:00 结束'],['竞价中','这里是一个树苗的名称这里是一个树苗的名称','12,345,567','剩余时间：00天06时24分99秒'],['待开始','这里是一个树苗的名称这里是一个树苗的名称','12,345,567','2026-10-10 14:00 开始'],['已成交','这里是一个树苗的名称这里是一个树苗的名称','12,345,567','2026-10-10 14:00 结束'],['已成交','这里是一个树苗的名称这里是一个树苗的名称','12,345,567','2026-10-10 14:00 结束'],['竞价中','这里是一个树苗的名称这里是一个树苗的名称','12,345,567','剩余时间：00天06时24分99秒'],['待开始','这里是一个树苗的名称这里是一个树苗的名称','12,345,567','2026-10-10 14:00 开始']];
const statusImg={'已成交':'assets/编组 2.png','竞价中':'assets/编组 15.png','待开始':'assets/待开始.png'};
$('#goodsGrid').innerHTML=goods.map((g,i)=>`<article class="good-card" data-index="${i}"><img class="status" src="${statusImg[g[0]]}"><img class="thumb" src="assets/Combined Shape.png"><p class="name">${g[1]}</p><p class="price">${g[0]==='竞价中'?'起拍价：':'成交价：'} <strong>${g[2]}</strong>元</p><div class="date">${g[3]}</div></article>`).join('');
$('#goodsGrid').addEventListener('click',e=>{const c=e.target.closest('.good-card');if(c)toast(`已打开第 ${Number(c.dataset.index)+1} 条林木产品交易信息（本地演示）`)});
const prices=[['桉树','759~780','up'],['松木','759~780','down'],['松原木','759~780','up'],['桉原木','759~780','up']];
$('#priceList').innerHTML=prices.map(p=>`<div class="price-card"><div class="kind">${p[0]}</div><div class="value">${p[1]} <span class="unit">元/m³</span></div><img src="assets/${p[2]==='up'?'路径上升.png':'路径下降.png'}"></div>`).join('');
function lineSvg(){let w=610,h=112;let colors=['#16d4ce','#ffc52b','#ff6b22'];let sets=[[],[],[]];for(let j=0;j<3;j++){let v=[15,17,14,18,16,20,13,15,18,14,19,22,20,24,23,26,21,24,25,22,28,25,27,24];sets[j]=v.map((n,i)=>{let val=n+(j===0?0:j===1?-5:-9)+Math.sin(i*1.7+j)*3;return `${i*w/23},${h-(val*3.3+10)}`}).join(' ')}let months=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><g stroke="#28639a" stroke-width=".7">${[20,42,64,86].map(y=>`<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`).join('')}</g>${sets.map((s,i)=>`<polyline points="${s}" fill="none" stroke="${colors[i]}" stroke-width="1.2"/>`).join('')}<g fill="#b7d8f7" font-size="9">${months.map((m,i)=>`<text x="${i*55+12}" y="109">${m}</text>`).join('')}</g></svg>`}
$('#trendChart').innerHTML=lineSvg();
const bars=[20,12,14,12,8,22,13,17];$('#yearChart').innerHTML=`<svg viewBox="0 0 380 118" preserveAspectRatio="none"><g stroke="#28639a" stroke-width=".7">${[22,46,70,94].map(y=>`<line x1="22" y1="${y}" x2="370" y2="${y}"/>`).join('')}</g>${bars.map((v,i)=>`<rect x="${34+i*42}" y="${98-v*3.1}" width="15" height="${v*3.1}" fill="#08a9e6"/>`).join('')}<g fill="#b7d8f7" font-size="9">${['一月','二月','三月','四月','五月','六月','七月','八月'].map((m,i)=>`<text x="${28+i*42}" y="114">${m}</text>`).join('')}</g></svg>`;
$('#topList').innerHTML=Array.from({length:5},(_,i)=>`<li><span>林场名称</span><span class="bar"></span><strong>2.75亿元</strong></li>`).join('');
$('#recentRows').innerHTML=Array.from({length:5},()=>`<tr><td>南宁YXX林场</td><td>南宁</td><td>桉树</td><td>980</td><td>600</td><td>3919</td><td>2023-10-02</td></tr>`).join('');
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
document.querySelectorAll('.service-card').forEach(el=>el.addEventListener('click',()=>toast(el.dataset.tip)));
document.querySelectorAll('.price-card').forEach(el=>el.addEventListener('click',()=>toast(`${el.querySelector('.kind').textContent}：本周参考价格 ${el.querySelector('.value').textContent}`)));
const cityTips={
  '南宁市':'当月挂牌：2939亩　10293.20万元\n累计成交：2939亩　10293.20万元',
  '桂林市':'当月挂牌：1850亩　7802.60万元\n累计成交：1460亩　6120.40万元',
  '柳州市':'当月挂牌：1206亩　5148.30万元\n累计成交：986亩　4201.80万元',
  '百色市':'当月挂牌：1622亩　6750.00万元\n累计成交：1308亩　5489.60万元'
};
document.querySelectorAll('.city').forEach(city=>city.addEventListener('mouseenter',()=>{
  const name=city.dataset.city;
  $('#mapTooltip').innerHTML=`${name}<br>${(cityTips[name]||'当月挂牌：980亩　3919.00万元\n累计成交：760亩　3040.00万元').replace(/\n/g,'<br>')}`;
  $('#mapTooltip').classList.add('is-visible');
}));
$('#mapImage').addEventListener('mouseleave',()=>$('#mapTooltip').classList.remove('is-visible'));
$('#modeButton').addEventListener('click',()=>toast('木材供应链模式：当前为大屏本地演示，未配置外部页面跳转'));
