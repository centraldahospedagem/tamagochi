$(document).ready(function() {

  $(document).bind('touchmove', function(e) {
  	e.preventDefault();
  });

  var tamagotchi = { food: 100, activity: 100, sleep: 100, money: 0, level: 1, evolution: 1, isDead: function() {
      if ((this.food <= 0) || (this.activity <= 0) || (this.sleep <= 0)) {
        return true;
      } else {
        return false;
      }
    }, pokeMaster: function() {
      if (this.level === 99) {
        return true;
      } else {
        return false;
      }
    }
  };

  var time = 0;
  var difficulty = 0;
  var cheatCode = 0;
  var counter = setInterval(timer, 800);

  // funções para botões

  $('#feed').click(function() {
    tamagotchi.food += 5;
  });

  $('#play').click(function() {
    tamagotchi.activity += 5;
  });

  $('#sleep').click(function() {
    tamagotchi.sleep += 5;
  });

  // botões de loja

  $('#buy-potion').on('click', 'img', function () {
    tamagotchi.food += 30;
    tamagotchi.activity += 30;
    tamagotchi.sleep += 30;
    tamagotchi.money -= .5;
    $('.money').empty();
    $('.money').append(Math.round(tamagotchi.money * 100)/100);
  });

  $('#buy-level-up').on('click', 'img', function () {
    tamagotchi.level += 1;
    tamagotchi.food = 100;
    tamagotchi.activity = 100;
    tamagotchi.sleep = 100;
    tamagotchi.money -= 1;
    $('.level').empty();
    $('.level').append(tamagotchi.level);
  });

  $('#buy-evolve').on('click', 'img', function () {
    tamagotchi.money -= 5;
    tamagotchi.evolution += .5;
    tamagotchi.food = 100;
    tamagotchi.activity = 100;
    tamagotchi.sleep = 100;
    alert('...What?\nCharmander is evolving!');
    $('#pokemon').attr('src', 'images/evolutionOne.gif');
    setTimeout(function(){ $('#pokemon').attr('src', 'images/charmeleon.gif'); }, 2250);
    setTimeout(function(){ alert('Charmander evoluiu para Charmeleon!'); }, 2750);
  });

  $('#buy-evolve2').on('click', 'img', function () {
    tamagotchi.money -= 10;
    tamagotchi.evolution += .5;
    tamagotchi.food = 100;
    tamagotchi.activity = 100;
    tamagotchi.sleep = 100;
    alert('...What?\nCharmeleon está evoluindo!')
    $('#pokemon').attr('src', 'images/evolutionTwo.gif');
    setTimeout(function(){ $('#pokemon').attr('src', 'images/evolutionThree.gif'); }, 3150);
    setTimeout(function(){ alert('Charmeleon evoluiu para Charizard!'); }, 4249);
    setTimeout(function(){ $('#pokemon').attr('src', 'images/charizard.gif'); }, 4250);
  });

  function timer() {
    // preços de loja

    if (tamagotchi.money < .5) {
      $('#potion').show();
      $('#buy-potion').hide();
    }

    if (tamagotchi.money > .5) {
      $('#potion').hide();
      $('#buy-potion').removeClass('hide');
      $('#buy-potion').show();
    }

    if (tamagotchi.money < 1) {
      $('#level-up').show();
      $('#buy-level-up').hide();
    }

    if (tamagotchi.money > 1) {
      $('#level-up').hide();
      $('#buy-level-up').removeClass('hide');
      $('#buy-level-up').show();
    }

    if (tamagotchi.money < 5 || tamagotchi.evolution == 2) {
      $('#evolve').show();
      $('#buy-evolve').hide();
      $('#buy-evolve2').hide();
    }

    if (tamagotchi.money > 5  && tamagotchi.evolution == 1) {
      $('#evolve').hide();
      $('#buy-evolve').removeClass('hide');
      $('#buy-evolve').show();
    }

    if (tamagotchi.money > 10 && tamagotchi.evolution == 1.5) {
      $('#evolve').hide();
      $('#buy-evolve').hide();
      $('#buy-evolve2').removeClass('hide');
      $('#buy-evolve2').show();
    }

    tamagotchi.money += (.01 * tamagotchi.level);
    tamagotchi.food -= (1.2 + difficulty - cheatCode - (tamagotchi.level * tamagotchi.evolution));
    tamagotchi.activity -= (1.2 + difficulty - cheatCode - (tamagotchi.level * tamagotchi.evolution));
    tamagotchi.sleep -= (1.2 + difficulty - cheatCode - (tamagotchi.level * tamagotchi.evolution));
    time += .25;

    if (time % 5 === 0) {
      difficulty += .5;
    }

    if (tamagotchi.isDead() === true) {
      clearInterval(counter);
      alert("Esta página lamenta informar que seu tamagotchi faleceu após uma longa vida útil" + time + " segundos...\n\nNão se preocupe, você pode tentar novamente!");
      location.reload();
    }

    //manter o nível de ultrapassar 99

    if (tamagotchi.level > 99) {
      tamagotchi.level = 99;
    }

    if (tamagotchi.pokeMaster() === true) {
      $('.level').empty();
      $('.level').append(tamagotchi.level);
      clearInterval(counter);
      alert("Uau! Você atingiu o nível 99.\nParabéns por se tornar um pokemaster!\nObrigado por jogar!");
      location.reload();
    }

    // lógica para parar o nível de ir acima de 100 (refac

    if (tamagotchi.food > 100) {
      tamagotchi.food = 100;
    }

    if (tamagotchi.activity > 100) {
      tamagotchi.activity = 100;
    }

    if (tamagotchi.sleep > 100) {
      tamagotchi.sleep = 100;
    }

    // lógica para mudar a cor das barras de progresso

    if (tamagotchi.food > 65) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.food < 65 && tamagotchi.food > 30) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.food < 30) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchi.activity > 65) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.activity < 65 && tamagotchi.activity > 30) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.activity < 30) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchi.sleep > 65) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.sleep < 65 && tamagotchi.sleep > 30) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.sleep < 30) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-danger');
    }

    // controles do teclado do computador

    $(document).keydown(function(e) {
        if (e.which === 37 && this.className === 'hold') {
          tamagotchi.food += .025;
        } else if (e.which === 40) {
          tamagotchi.activity += .025;
        } else if (e.which === 39) {
          tamagotchi.sleep += .025;
        } else if (e.which == 77 && e.ctrlKey) {
          tamagotchi.money += 1;
          cheatCode = 1000;
        } else if (e.which == 65 && tamagotchi.money > 5 && tamagotchi.evolution == 1) {
          tamagotchi.money -= 5;
          tamagotchi.evolution += .5;
          tamagotchi.food = 100;
          tamagotchi.activity = 100;
          tamagotchi.sleep = 100;
          alert('...What?\nCharmander is evolving!');
          $('#pokemon').attr('src', 'images/evolutionOne.gif');
          setTimeout(function(){ $('#pokemon').attr('src', 'images/charmeleon.gif'); }, 2250);
          setTimeout(function(){ alert('Charmander evolved into Charmeleon!'); }, 2750);
        } else if (e.which == 65 && tamagotchi.money > 10 && tamagotchi.evolution == 1.5) {
          tamagotchi.money -= 5;
          tamagotchi.evolution += .5;
          tamagotchi.food = 100;
          tamagotchi.activity = 100;
          tamagotchi.sleep = 100;
          alert('...What?\nCharmeleon is evolving!')
          $('#pokemon').attr('src', 'images/evolutionTwo.gif');
          setTimeout(function(){ $('#pokemon').attr('src', 'images/evolutionThree.gif'); }, 3150);
          setTimeout(function(){ alert('Charmeleon evolved into Charizard!'); }, 4249);
          setTimeout(function(){ $('#pokemon').attr('src', 'images/charizard.gif'); }, 4250);
        } else if (e.which == 83 && tamagotchi.money > 1 && this.className === 'hold') {
          tamagotchi.money -= 1;
          tamagotchi.level += 1;
          tamagotchi.food = 100;
          tamagotchi.activity = 100;
          tamagotchi.sleep = 100;
          $('.level').empty();
          $('.level').append(tamagotchi.level);
        } else if (e.which == 68 && tamagotchi.money > .49) {
          tamagotchi.money -= .5;
          tamagotchi.food = 100;
          tamagotchi.activity = 100;
          tamagotchi.sleep = 100;
        }

        this.className = 'hold';
    });

    $(document).keyup(function(e) {
      this.className = '';
    });

    // lógica para alterar o valor das barras de progresso, estatísticas e atualização da contagem de dinheiro

    $('#food-level').css('width', tamagotchi.food + "%");
    $('#activity-level').css('width', tamagotchi.activity + "%");
    $('#sleep-level').css('width', tamagotchi.sleep + "%");
    $('.money').empty();
    var moneyRounded = Math.round(tamagotchi.money * 100)/100;
    $('.money').append(moneyRounded.toFixed(2));
    $('.sleep').empty();
    $('.sleep').append(tamagotchi.sleep.toFixed());
    $('.activity').empty();
    $('.activity').append(tamagotchi.activity.toFixed());
    $('.food').empty();
    $('.food').append(tamagotchi.food.toFixed());
  }

});
