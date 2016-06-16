function ready(){

    "use strict";

    // объект данных по отделам
    var Departments = {
        it: [ 
            {	name: "Ivan",
                salary: 1000 }, 
            {  	name: "Petr",
                salary: 1100 }, 
            {   name: "Bob",
                salary: 1200 },
            {   name: "Валера",
                salary: 1200 }
        ],
        sales: [ 
            {   name: "James",
                salary: 900 }, 
            {   name: "Dan",
                salary: 800 }, 
            {   name: "Igor",
                salary: 1200 }
        ],
        pr: [ 
            {   name: "Ann",
                salary: 1000 }, 
            {   name: "Kate",
                salary: 900 }, 
            {   name: "Nick",
                salary: 1100 }
        ]
    };

    // функция создания DOM элемнта
    function makeEl( element , className ){
        var el = document.createElement( element );
        if( className ){
            el.className = className;
        }

        return el; 
    }

    // функция поиска элемента DOM
    function $( el ){
        return document.querySelector( el );
    }
    

    // обработка данных первого уровня(название отделов) и создание шапки таблиц
    function readArray( arrName, position ){
        var table, 
            caption, 
            trh;

        table = makeEl( "table", arrName);
        table.setAttribute( "id", arrName);
        caption = makeEl( "caption" );
        caption.insertAdjacentHTML( "afterBegin", arrName );
        trh = makeEl( "tr", "trh_" + arrName );
        table.appendChild( caption );
        table.appendChild( trh );
        position.appendChild( table );    
    }
    
    // обработка данных третего уровня(значения объекта с ключами name и salary) и создание строк и ячеек таблицы. 
    function readObj( position, obj, objKey ){
        var tr, 
            td, 
            th, 
            thProp, 
            tdProp,
            
            i, len;

        tr = makeEl( "tr");
 
        for( i = 0, len = objKey.length; i < len; i++ ){
            
            thProp = objKey[ i ];
            tdProp = obj[ thProp ];

            // добавление в таблицу полей "name" и "salary" и ограничение повторного добавления
            if( !$( "." + position  + " ." + thProp )){
                th = makeEl( "th", thProp );
                th.insertAdjacentHTML( "afterBegin", thProp );
                $( ".trh_" + position ).appendChild( th );
            }
            // добавление в таблицу значений salary
            if ( thProp === "salary" ){
                td = makeEl( "td", "salaryVal" );
                td.insertAdjacentHTML( "afterBegin", tdProp );
            }
            // добавление в таблицу значений name
            else if ( thProp === "name" ){
                td = makeEl( "td", "nameVal" );
                td.insertAdjacentHTML( "afterBegin", tdProp );
            }
            else{
                alert( "проверте коректность данных" );
            }
            tr.appendChild( td );
        }
        $( "#" + position ).appendChild( tr );
    }


    // вывод данных в окне браузера
    function printList( obj, posId ){
        var firstLev, 
            firstLevKey, 
            secondLev, 
            position,

            i,len,
            j,len2;

        firstLev = Object.keys( obj );
        position = $( "#" + posId );
        
        // перебор основного объекта
        for( i = 0, len = firstLev.length; i < len; i++ ){
            firstLevKey = firstLev[ i ];
            secondLev = obj[ firstLevKey ];
          
            readArray( firstLevKey, position);

            // перебор массива
            for( j = 0, len2 = secondLev.length; j < len2; j++ ){
                //console.log( secondLev[ j ]);
                var secondLevKey, 
                    thirdLev,
                    tr, 

                    k,len3;

                secondLevKey = secondLev[ j ];
                thirdLev = Object.keys( secondLevKey );
                
                readObj( firstLevKey, secondLevKey, thirdLev );
            }   
        }
    }
    
    printList( Departments, "departments");

    // функция проверки ввода пользователя и прибавление соответсвующего значения
    function checkFormVal( salary, val ){
        var rePercent = new RegExp( "^[0-9]+%$", "gm" ),
            reNum = new RegExp( "^[0-9]+$", "gm" );
                
            if( val.search( reNum ) !== -1 )
                return +salary + (+val);
          
            else if( val.search( rePercent ) !== -1 )
                return +salary + (+salary * ( parseInt(val,10) / 100 )); 

            else if( isNaN( val + "e0" + 0) )
                return salary;         
    }

    

    // функция измения значения salary всем сотрудникам
    function setAll( val ) {
        var tdSalary = document.querySelectorAll( "td.salaryVal" ),
            sal,

            i, len;
        //console.log( +val );
        for( i = 0, len = tdSalary.length; i < len; i++ ){
            sal = tdSalary[ i ].innerHTML;
            
            tdSalary[ i ].innerHTML = checkFormVal( tdSalary[ i ].innerHTML, val );
            
            if ( tdSalary[ i ].innerHTML === sal )
                return alert("Не корректный ввод значения заработной платы, введите число или значение в процентах(пример: 20% )");

        }
    }


    // функция измения значения salary конкретному сотруднику
    function setOne( dept, name, val ) {
        var id =  $( "#departments" ),
            table = id.querySelectorAll( "#" + dept ),
            td, 
            tdSalary, 
            sal,

            i, len, j, len2;
            
        //console.log( id );
        if ( table.length >= 1 ){
            //console.log( table.length );
            for( i = 0, len = table.length; i < len; i++ ){
                td = table[ i ].querySelectorAll(".nameVal");
                //console.log( td );

                for( j = 0, len2 = td.length; j < len2; j++ ){
                    
                    if ( td[ j ].innerHTML === name ){
                        tdSalary = td[ j ].nextSibling;
                        sal = tdSalary.innerHTML;
                        
                        tdSalary.innerHTML = checkFormVal( tdSalary.innerHTML, val );
                        
                        if ( tdSalary.innerHTML === sal )
                            return alert("Не корректный ввод значения заработной платы, введите число или значение в процентах(пример: 20% )");
  
                        return;
                    } 
                }
                alert( "Такого имени нет в данном отделе, проверте и введите данные снова!");
            }
        }
        else{
            alert("Такого отдела не существует данной организации, проверте и введите данные снова!");
        }
    }
    

    // функция измения значения salary всем сотрудникам неадекватным боссом:)
    function inadequateBoss( val ) {
        
        var tdSalary = document.querySelectorAll(".salaryVal"),
            per,

            i, len;
        //console.log(  tdSalary.innerHTML );
        for( i = 0, len = tdSalary.length; i < len; i++){
            
            if( !isNaN( val + "e0" + 0 )){
                if ( +val >= 100 && +val <= 10000 ){
                    per = Math.floor( ( Math.random() - 0.5 ) * +val );
                    tdSalary[ i ].innerHTML = +tdSalary[ i ].innerHTML + per;
                }
                else if( +val > 10000 ){
                    alert( "Уважаемый босс, извините за прямолинейность, вам пора к доктору!!!:))" );
                    break; 
                }
                else if( +val < 100 ){
                    alert( "Уважаемый босс, я знаю, что  ты можешь быть более неадекватным! Продемонстрируй это:)" );
                    break; 
                }
            }
            else 
                return alert( "Уважаемый босс, доктор уже едет!!:))" );
        }                    
    }

    // обратотка событий форм
    // событие submit для форм
    

    $( "#" + "forms").addEventListener( "submit", function( e ){
        e.preventDefault();
        var val, 
            dept, 
            name,
            eventId = e.target.id;

        //console.log( e.target.id );
        if ( eventId === "changeAll"){
            val = document.getElementById("changeAllVal").value;
            setAll( val );
        }
        else if ( eventId === "changeOne"){
            val = document.getElementById("changeOneVal").value;
            dept = document.getElementById("changeOneDept").value;
            name = document.getElementById("changeOneName").value;
            setOne( dept, name, val );
        }
        else if ( eventId === "idiot"){
            val = document.getElementById("idiotVal").value;
            inadequateBoss( val );
        } 

        e.target.reset();
    }, false);


}
document.addEventListener( "DOMContentLoaded", ready, false);

