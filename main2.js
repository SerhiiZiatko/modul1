
" use strict ";

function ready(){
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
    // вывод данных в окне браузера
    function printList( obj, posId ){
        var firstLev, 
            firstLevKey, 
            secondLev, 
            position,

            i,len,
            j,len2;

        firstLev = Object.keys( obj );
        position = document.getElementById( posId );
        
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
    function readObj(position, obj, objKey ){
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
            if( !document.getElementsByClassName( position )[ 0 ].getElementsByClassName( thProp )[ 0 ] ){
                th = makeEl( "th", thProp );
                th.insertAdjacentHTML( "afterBegin", thProp );
                document.getElementsByClassName( "trh_" + position )[ 0 ].appendChild( th );
            }
            // добавление в таблицу значений sarary
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
        document.getElementById( position ).appendChild( tr );
    }

    printList( Departments, "departments");

    // функция измения значения salary всем сотрудникам
    function setAll( val ) {
        
        var tdSalary = document.querySelectorAll( "td.salaryVal" ),
            per,

            i, len;
        console.log( +val );
        for( i = 0, len = tdSalary.length; i < len; i++ ){
            if( isNaN( +val ) && val.indexOf( "%", 1 ) === -1 ){
                alert("Не корректный ввод значения заработной платы, введите число или значение в процентах(пример: 20% )");
                return;
            }
            else if( val.indexOf( "%", 1 ) !== -1 ){
                per = parseInt( val, 10 ) / 100;
                // дополнительная проверка на не корректный ввод типа ("twenty%")
                if( isNaN( per ) ){
                    alert("Не корректный ввод значения заработной платы, введите число или значение в процентах(пример: 20% )");
                    return;
                }
                tdSalary[ i ].innerHTML = +tdSalary[ i ].innerHTML + ( +tdSalary[ i ].innerHTML * per );
            }
            else {
                tdSalary[ i ].innerHTML = +tdSalary[ i ].innerHTML + ( +val );
            }
                            
        }
    }
    // функция измения значения salary конкретному сотруднику
    function setOne( dept, name, val ) {
        var id =  document.querySelector( "#departments" ),
            table = id.querySelectorAll( "#" + dept ),
            td, 
            tdName, 
            tdSalary, 
            per, 

            i, len, j, len2;

        //console.log( id );
        if ( table.length >= 1 ){
            //console.log( table.length );
            for( i = 0, len = table.length; i < len; i++ ){
                td = table[ i ].querySelectorAll(".nameVal");
                //console.log( td );

                for( j = 0, len2 = td.length; j < len2; j++ ){
                    
                    if ( td[ j ].innerHTML === name ){
                        //console.log( td[ j ].innerHTML );
                        //tdSalary = td[ j ].parentNode.querySelector( ".salaryVal" );
                        tdSalary = td[ j ].nextSibling;
                        console.log( typeof +val );
                        if( isNaN( +val ) && val.indexOf( "%", 1 ) === -1 ){
                            alert("Не корректный ввод значения заработной платы, введите число или значение в процентах(пример: 20% )");
                            return;
                        }
                        else if ( val.indexOf( "%", 1 ) !== -1 ){
                            per = parseInt( val, 10 ) / 100;
                            // дополнительная проверка на не корректный ввод типа ("twenty%")
                            if( isNaN( per ) ){
                                alert("Не корректный ввод значения заработной платы, введите число или значение в процентах(пример: 20% )");
                                return;
                            }

                            tdSalary.innerHTML = +tdSalary.innerHTML + ( +tdSalary.innerHTML * per );
                        }
                        else if( typeof +val === "number" ){
                            tdSalary.innerHTML = +tdSalary.innerHTML + ( +val );
                        }             
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
        
        var tdSalary = document.querySelectorAll(".salaryVal");
        //console.log(  tdSalary.innerHTML );
        for( var i = 0, len = tdSalary.length; i < len; i++){
        
            if ( +val >= 100 && +val <= 10000 ){
                var per = Math.floor( ( Math.random() - 0.5 ) * +val );
                //console.log( per );

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
    }

    // обратотка событий форм
    // событие submit для формы "Поднять зарплату всем!"
    var changeAll = document.getElementById("changeAll");

    changeAll.addEventListener( "submit", function( e ){
        e.preventDefault();
        var val = document.getElementById("changeAllVal").value;
        setAll( val );
        changeAll.reset();
    }, false);

    // событие submit для формы "Поднять зарплату одному из:)"
    var changeOne = document.getElementById("changeOne");
    
    changeOne.addEventListener( "submit", function( e ){
        e.preventDefault();
        var val = document.getElementById("changeOneVal").value,
            dept = document.getElementById("changeOneDept").value,
            name = document.getElementById("changeOneName").value;
        setOne( dept, name, val );
        changeOne.reset();
    }, false);

    // событие submit для формы "Неадекватный босс!"
    var idiot = document.getElementById("idiot");

    idiot.addEventListener( "submit", function( e ){
        e.preventDefault();
        var val = document.getElementById("idiotVal").value;
        inadequateBoss( val );
        idiot.reset();
    }, false);


}
document.addEventListener( "DOMContentLoaded", ready);

