document.addEventListener('DOMContentLoaded', ()=>{
   
    console.log('hi');

    document.querySelector('form.emailSubmit').onsubmit = function() {
       const input = document.querySelector('input.emailSubmit').value;
       const caution = document.querySelector('span.emailSubmit');
       console.log(input);
       console.log(caution.classList);
        if (!input.includes('@')){
            caution.classList.remove('hidden')
        } else if(!caution.classList.contains('hidden')){
            caution.classList.add('hidden');
        }
    return false;
    }

   

});