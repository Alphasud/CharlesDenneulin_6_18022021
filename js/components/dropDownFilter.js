
export function selectFilter() {

    const customSelectWrapper = document.querySelector('.custom-select-wrapper');
    const customSelect = document.querySelector('.custom-select');
    const customOption = document.querySelectorAll('.custom-option');

    customSelectWrapper.addEventListener('click', function () {
        customSelect.classList.toggle('open');
    });

    /*customSelectWrapper.addEventListener('keydown', function (event) {
        if (event.key == 'ArrowDown') {
            customSelect.classList.add('open');
        }
        if (event.key == 'ArrowUp') {
           customSelect.classList.remove('open');     
        }
     });*/
    
    for (const option of customOption) {
        option.addEventListener('click', function() { 
            if (!option.classList.contains('selected')) { //Target items of customOption that don't contain 'selected'
                option.parentNode.querySelector('.custom-option.selected').classList.remove('selected');    // Find the 'selected' class and remove it making the element visible
                option.classList.add('selected'); //Add the selected class to the clicked item thus making it display:none
                option.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = option.textContent;
                //Pass the content of the clicked item to custom-select__trigger span
            }
        })

        option.addEventListener('keydown', function (event) { 
            if (event.key == 'Enter') {
                console.log('yes');
                if (!option.classList.contains('selected')) { //Target items of customOption that don't contain 'selected'
                    option.parentNode.querySelector('.custom-option.selected').classList.remove('selected');    // Find the 'selected' class and remove it making the element visible
                    option.classList.add('selected'); //Add the selected class to the clicked item thus making it display:none
                    option.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = option.textContent;
                    //Pass the content of the clicked item to custom-select__trigger span
                }
            }
        })
    }

    ////CLOSE DROPDOWN WHEN USER CLICKS ANYWHERE
    window.addEventListener('click', function(event) {
    const select = document.querySelector('.custom-select') 
        if (!select.contains(event.target)) { // If the node does not contain .custom-select (meaning the class is currently .custom-select-open) 
        select.classList.remove('open');        //then 'open' is removed.
    }
    });








}

