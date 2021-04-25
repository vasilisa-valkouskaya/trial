document.addEventListener('DOMContentLoaded', function(){
    
    const typeBtns = document.querySelector('.plan-type');
    const cards = document.querySelectorAll('.card-wrapper');

    typeBtns.addEventListener('click', function(e) {
            let target = e.target;
            if (target.classList.contains('plan-type__btn')) {
                if (target.classList.contains('active-type')) return;
                let typeBtnsAll = document.querySelectorAll('.plan-type__btn');
                removeClass(typeBtnsAll, 'active-type');
                target.classList.add('active-type');
    
                let typeBtnId = target.id;
                removeClass(cards, 'hidden');
                cards.forEach(el => {
                    if(el.dataset.type != typeBtnId) {
                        el.classList.add('hidden');
                    }
                });
            };
          
            
        });

        let removeClass = function(btns, className) {
            btns.forEach(element => {
               if(element.classList.contains(className)) {
                element.classList.remove(className)
               }
            });
    };
});

