// elemanların seçilmesi
const inp = document.getElementsByTagName('input')[0];
const btn = document.getElementsByClassName('btn')[0];
const div = document.getElementById('wrapper');
const warn = document.querySelector('.alert');

// localstorage'dan valuelerin localArr'e atılması
let localArr = JSON.parse(localStorage.getItem('works'));
if(localArr==null){
    localArr = []; // eğer hiç veri yoksa boş bir dizi açılıyor, null hatası dönmemesi için
}

// önceden oluşturulmuş valueler varsa oluşturulduiu sayı kadar for döngüsü ile oluşturulup localArr[i] ile ilgili p elamanı içerisine yazılıyor
if(div.innerHTML != ''){ 
    for(let i=0; i<localArr.length; i++){
        let tasks = document.createElement('div');
        tasks.addEventListener('click',done);
        tasks.style.display='flex';
        tasks.style.justifyContent='space-between';
        tasks.style.padding='10px';
        let p = document.createElement('p');
        p.style.margin='0';
        let span = document.createElement('span');
        span.addEventListener('click',sil);
        span.style.cursor='pointer';
        p.textContent=localArr[i].task;
        span.innerHTML='<i class="fa-solid fa-trash"></i>';
        if(localArr[i].color == 'done'){
            tasks.classList.add('bg-danger');
            tasks.classList.add('text-decoration-line-through');
        }

        tasks.appendChild(p);
        tasks.appendChild(span);
        div.appendChild(tasks);
    }
}

// kaydet butonu ile hem sayfaya hem localstorageye veri kayıt edilmesi
function kaydet(){
    let value = inp.value;
    if(value.trim() !=''){
        // local e kayıt
        localArr.push({task:value, color:'default'});
        localStorage.setItem('works',JSON.stringify(localArr));

        let tasks = document.createElement('div');
        tasks.addEventListener('click',done);
        tasks.style.display='flex';
        tasks.style.justifyContent='space-between';
        tasks.style.padding='10px';
        let p = document.createElement('p');
        p.style.margin='0';
        let span = document.createElement('span');
        span.addEventListener('click',sil);
        span.style.cursor='pointer';
        p.textContent=value;
        span.innerHTML='<i class="fa-solid fa-trash"></i>';
        // elemanlar parentlarına atanıyor
        tasks.appendChild(p);
        tasks.appendChild(span);
        div.appendChild(tasks);
        // input içerisi işlem sonu boşaltılıyor
        inp.value='';   


        // console.log(localArr[0].task)
    }
    // boş değer girildiğinde zamana duyarlı çıkan hata yazısı
    else{
        warn.classList.remove('d-none');
        setTimeout(removeWarn,2000);
    }
}

// hata yazısını silen fonksiyon
function removeWarn(){
    warn.classList.add('d-none');
}

// enter ile de inputtan kayıt alnabilmesi
inp.addEventListener('keyup',(e)=>{
    if(e.keyCode==13){
        kaydet();
    }
});



function sil(){
    let delArr =[];
    // console.log(delArr)
    for(let i=0; i<localArr.length; i++){
        delArr.push(localArr[i].task);
    }
    // tıklanılan elemanın displayini none yaparak ortadan kaldırıyor
    this.parentElement.style.display='none';
    // tıklanılan elemanın index numarası saptanıyor
    let findIndex = delArr.indexOf(this.parentElement.textContent);
    // console.log(findIndex)
    localArr.splice(findIndex,1);
    // silindikten sonra güncel localArr değeri localstorage a set ediliyor
    localStorage.setItem('works',JSON.stringify(localArr));
}

// oluşturulan divlerin üzerine tıklandığında arkaplan değişimi ve yazının üstünün çizilmesi
function done(){
    this.classList.toggle('bg-danger');
    this.classList.toggle('text-decoration-line-through');


    let colArr = [];
    for(let i=0; i<localArr.length; i++){
        colArr.push(localArr[i].task);
    }

    let find = colArr.indexOf(this.textContent);
    // localStorage.setItem('color', 'done')
    if(localArr[find].color == 'default'){
        localArr[find].color = 'done';
    }
    else{
        localArr[find].color = 'default';
    }
    localStorage.setItem('works',JSON.stringify(localArr));
}

