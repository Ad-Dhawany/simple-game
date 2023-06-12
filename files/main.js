$(function(){
    'use strict'
    var player = $('.player');
    var enemy = $('.enemy');
    var goal = $('.goal');
    var yp = 640;
    var xp = 765;
    var ye = 100;
    var xe = 765;
    var xg , yg;
    var up = 38 , down = 40 , right = 39 , left = 37;
    var g_num = 0;
    var game = 0;
    var inter = 70 , score = 0;
    var lose = 0;
    var goalIcon = "files/goal_level_1/number_";
    var audioElement = document.createElement('audio');
    var audioElement1 = document.createElement('audio');
    var audioElement11 = document.createElement('audio');
    var audioElement2 = document.createElement('audio');
    audioElement1.setAttribute('src', 'files/sounds/goal1.wav');
    audioElement11.setAttribute('src', 'files/sounds/goal2.wav');  
    audioElement2.setAttribute('src', 'files/sounds/lose.mp3');
    var audioGoal = audioElement1; 
    $('html').keydown(function (e) { 
        //start player control
        if(e.which == down){
            e.preventDefault();
            if (yp < 680){
            yp = yp + 8 ;
            var ypx = '';
            ypx = yp +'px';
            // $('#test2').text(ypx);
            player.css('top', ypx);
            }
        }

        if(e.which == up){
            e.preventDefault();
            if (yp > 0){
            yp = yp - 8 ;
            var ypx = '';
            ypx = yp +'px';
            // $('#test2').text(ypx);
            player.css('top', ypx);
            }
        }

        if(e.which == left){
            e.preventDefault();
            if (xp < 1500){
            xp = xp + 8 ;
            var xpx = '';
            xpx = xp +'px';
            // $('#test2').text(xpx);
            player.css('right', xpx);
            }
        }

        if(e.which == right){
            e.preventDefault();
            if (xp > 0){
            xp = xp - 8 ;
            var xpx = '';
            xpx = xp +'px';
            // $('#test2').text(xpx);
            player.css('right', xpx);
            }
        }
        //end player control
        
        //start goal action
        
        if(((yp - yg < 36 && yp - yg > 0) || (yg - yp < 60 && yg - yp > 0)) && ((xp - xg < 30 && xp - xg > 0) || (xg - xp < 55 && xg - xp > 0)) ){
            audioGoal.play();
            MoveGoal();
        }
        //end goal action
        

        /* if (ye < yp) {
            ye = ye + 4;
            var yepx = '';
            yepx = ye +'px';
            // $('#test').text(yepx);
            enemy.css('top', yepx);
        }else if(ye > yp) {
            ye = ye - 4;
            var yepx = '';
            yepx = ye +'px';
            // $('#test').text(yepx);
            enemy.css('top', yepx);
        }

        if (xe < xp) {
            xe = xe + 4;
            var xepx = '';
            xepx = xe +'px';
            // $('#test').text(xepx);
            enemy.css('right', xepx);
        }else if (xe > xp) {
            xe = xe - 4;
            var xepx = '';
            xepx = xe +'px';
            // $('#test').text(xepx);
            enemy.css('right', xepx);
        }
 */
    });
    $('.start').click(function () {
        audioElement.setAttribute('src', 'files/sounds/start.wav'); 
        audioElement.play();
        $('#PlayerIMG').fadeIn();
        goalIcon = "files/goal_level_1/number_";
        audioGoal = audioElement1;
        up = 38;
        down = 40;
        left = 37;
        right = 39;
        yp = 640;
        xp = 765;
        ye = 100;
        xe = 765;
        lose = 0;
        game++
        enemy.css('top', '100px');
        enemy.css('right', '765px');
        player.css('right', '765px');
        player.css('top', '640px');
        g_num = 0;
        MoveGoal();
        enemyComming(game);
    });
    function MoveGoal() {
    /*  if (g_num == 2){
            stopGame();
        } */
        xg = Math.random() * 1550;
        yg = Math.random() * 680;
        let ygpx = yg + 'px';
        let xgpx = xg + 'px';
        score = g_num * (10 + g_num);
        let scoreV = "النقاط : " + score;
        $('.score').empty().text(scoreV);
        g_num = g_num + 1 ;
        if (g_num > 10){
            goalIcon = "files/goal_level_2/number_" ;
            audioGoal = audioElement11;
        }
        inter = inter - 1 ;
        $('#goalIMG').attr('src', '' + goalIcon + g_num + '.png');
        goal.css('display', 'block');
        goal.css('top', ygpx );
        goal.css('right', xgpx );
    }

    function enemyComming(i = 0, j = 0) {
        if (i == 1){
        const enemyInt = setInterval(function() {
            if (ye < yp) {
                ye = ye + 4;
                var yepx = '';
                yepx = ye +'px';
                // $('#test').text(yepx);
                enemy.css('top', yepx);
            }else if(ye > yp) {
                ye = ye - 4;
                var yepx = '';
                yepx = ye +'px';
                // $('#test').text(yepx);
                enemy.css('top', yepx);
            }
    
            if (xe < xp) {
                xe = xe + 4;
                var xepx = '';
                xepx = xe +'px';
                // $('#test').text(xepx);
                enemy.css('right', xepx);
            }else if (xe > xp) {
                xe = xe - 4;
                var xepx = '';
                xepx = xe +'px';
                // $('#test').text(xepx);
                enemy.css('right', xepx);
            }
            if (g_num >= 31 || lose == 1){
                clearInterval(enemyInt);
                game = 0;
                if(g_num >= 31){stopGame(0);}
                 }
                //start game over
        
            if(((yp - ye <= 61 && yp - ye >= 0) && ((xp - xe <= 33 && xp - xe >= 0) || (xe - xp <= 33 && xe - xp >= 0))) || ((ye - yp <= 61 && ye - yp >= 0) && ((xp - xe <= 48 && xp - xe >= 0) || (xe - xp <= 48 && xe - xp >= 0)))){
                audioElement2.play();
                stopGame();
            }
        //end game over
            },inter);
    }
    
    }

    function stopGame(i = 1){
        lose = 1;
        up = 300;
        down = 301;
        left = 302;
        right = 303;
        if(i == 1){
        $('#PlayerIMG').fadeOut(1000);
        }else if(i == 0) {
            enemy.fadeOut(1200);
            goal.hide();
        }
    }
   /*  $('#audiobtn').click(function () { 
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'files/sounds/start.wav');
        audioElement.play();
    }); */
  
});


