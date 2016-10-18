$(document).ready(main());
var zindex = 0; 
function spawnWindow(windowType, x, y) {
  windowID +=1; 
  console.log("id:"+windowID);
  var title; 
  switch(windowType) {
    case 'email':
      title="Sign-up for our email list!";
      break;    
    case 'events':
      title="upcomming events!";
      break;    
    case 'upcomming':
      title="next meeting";
      break;    
    case 'wiki':
      title="Club wiki"
      break;
    case 'news':
      title="News";
    break;
    case 'game':
      title="GAME";
    break;
  }
  var $newWindow = $(
      '<div class="panel panel-primary" class="ui-widget-content" id="window-'
      +windowID.toString()
      +'">'
      +'<div class="panel-heading">'
        +'<span class="panel-title">'
        +title
        +'</span>'
        + '<span class="panel-buttons">'
          + '<span class="panel-maximize-button">□</span>'
          + '<span class="panel-minimize-button">–</span>'
          + '<span class="panel-close-button">X</span>'
        + '</span>'
      + '</div>'
      + '<div class="panel-body">'
      +'</div>'
    + '</div>');
  $('.window-container').append($newWindow);

  switch(windowType) {
    case 'email':
      $newWindow.children('.panel-body').load(
       'email/ajax'
      );
      setTimeout(
        function(){
         $newWindow.children('.panel-body').css('height',$newWindow.children('.panel-body').children('.form-horizontal').height().toString()+'px')
         $newWindow.children('.panel-body').css('padding-left', '5px');
         $newWindow.children('.panel-body').css('padding-right', '5px');

        }
       ,200 );


      break;    
    case 'events':
      $newWindow.children('.panel-body').load(
       'events/eventsAjax'
      );
      setTimeout(
        function(){
         $newWindow.children('.panel-body').css('height',$newWindow.children('.panel-body').children('.panel-body').height().toString()+'px')
         $newWindow.children('.panel-body').css('padding-left', '5px');
         $newWindow.children('.panel-body').css('padding-right', '5px');

        }
       ,200 );
      break;    
    case 'upcomming':
      $newWindow.children('.panel-body').load(
       'events/upcommingAjax'
      );
      setTimeout(
        function(){
         $newWindow.children('.panel-body').css('height',$newWindow.children('.panel-body').children('.nextmeeting').height().toString()+'px')
         $newWindow.children('.panel-body').css('padding-left', '5px');
         $newWindow.children('.panel-body').css('padding-right', '5px');

        }
       ,200 );
      break;    
    case 'wiki':
      $newWindow.children('.panel-body').append(
       '<iframe src="wiki"></iframe>'
      );
      break;
    case 'news':
      $newWindow.children('.panel-body').load(
       'news/ajax'
      );
      setTimeout(
        function(){
         $newWindow.children('.panel-body').css('height',$newWindow.children('.panel-body').children('.newslist').height().toString()+'px')
         $newWindow.children('.panel-body').css('padding-left', '5px');
         $newWindow.children('.panel-body').css('padding-right', '5px');

        }
       ,200 );
      case 'game':
        $newWindow.children('.panel-body').append(
         '<iframe src="events/game"></iframe>'
        );
      break; 
    break;
  }
  //$newWindow.children('.panel-body').load('http://csci.club');
  $newWindow.css('position', 'absolute');
  if(x){
    $newWindow.css('left',''+x.toString()+'px');
    $newWindow.css('top',''+y.toString()+'px');
  }
  else{
    $newWindow.css('left',''+(offset*20).toString()+'px');
    $newWindow.css('top',''+(offset*30).toString()+'px');
  }
  offset+=1;
  windowsCountingDown +=1;
  setTimeout(
  function() 
    { 
      windowsCountingDown-=1;
      console.log('windowsCountingDown '+windowsCountingDown.toString());
      if(windowsCountingDown>0){
        
      }
      else{
        windowsCountingDown=0;
        offset=0;
      }
    }, 5000);

    //init window stuff.. need to do this to specific new wind
  $newWindow.draggable({ handle:'.panel-heading'});
  $newWindow.children('.panel-body').resizable({
    minHeight: $newWindow.children('.panel-body').outerHeight(true),
    minWidth: $newWindow.children('.panel-body').outerWidth(true),
  });

  $newWindow.children('.panel-body').css('height', ''+$newWindow.children('.panel-body').height().toString()+'px');
  $newWindow.children('.panel-body').css('width', ''+$newWindow.children('.panel-body').width().toString()+'px');

  
  $newWindow.find('.panel-close-button').click(
    function(){
      var id = $newWindow.attr('id');
      $newWindow.toggle("fast");
      console.log('#'+id+id);
      $('#'+id+id).toggle("fast");
  });  
  $newWindow.find('.panel-minimize-button').click(
    function(){
      $newWindow.slideToggle('fast');
  }); 

  $newWindow.find('.panel-maximize-button').click(
    function(){
      $newWindow.children('.panel-body').css('width', ''+($('.window-container').outerWidth()-30).toString());
      $newWindow.children('.panel-body').css('height',''+($('.window-container').outerHeight()-$newWindow.children('.panel-heading').outerHeight()/2).toString())
      $newWindow.css('left', '3px');
      $newWindow.css('top', '-30px');
  });   

  $newWindow.mousedown(function(){
    zindex+=1; 
    $(this).css("zIndex", zindex);
    console.log(zindex);
  });



  var $newTaskbarElement = $(
    '<li id="177"><div class="taskbar-item" title="window-'
    +windowID.toString()
    +'" id="window-'
    +windowID.toString()
    +'window-'
    +windowID.toString()
    +'">'
    +title
    +'</div></li>'
  );
  $('.taskbar').append($newTaskbarElement);

  $newTaskbarElement.click(function(){
    var id = $(this).children().attr('title');
    console.log('#'+id);
    $('#'+id).slideToggle('fast');
    $startMenu.slideUp('fast');

  });

  $newWindow.children('.panel-body').css('height', ''+$newWindow.children('.panel-body').outerHeight().toString()+'px');
  $newWindow.children('.panel-body').css('width', ''+$newWindow.children('.panel-body').outerWidth().toString()+'px');

}


function main() {
  //global variables
  windowID = 0; 
  offset = 0; 
  windowsCountingDown = 0;

  $('.panel.panel-primary').draggable({ handle:'.panel-heading'});
  $('#spawner').click(function(){
    $('.startmenu').slideToggle('slow');
  });

  //$('.panel-body').resizable();
  $('.panel.panel-primary').mousedown(function(){
    zindex+=1; 
    $(this).css("zIndex", zindex);
    console.log(zindex);
  });
  $('.panel-body').each(
      function() {
        $(this).resizable({
          minHeight: $(this).outerHeight(true),
          minWidth: $(this).outerWidth(true),
        });
      }
    );
  $('.panel-close-button').click(function(){
      $(this).parents('.panel.panel-primary').toggle('slow');
  });  
  $('.panel-minimize-button').click(function(){
      $(this).parents('.panel.panel-primary').children('.panel-body').toggle('slow');
  });  
  $('.panel-maximize-button').click(function(){
      //$('.panel.panel-primary').toggle('slow');
  }); 
  $('.window-container').css('height',$('#window-container').outerHeight());
  $('.window-container').css('width',$('#window-container').outerWidth());
  $('.taskbar').css('max-height', $('.taskbar').outerHeight());

  $startMenu = $(
    '<div class="startmenu"><ul>'
    +'<li class="menuItem" id="menu-email">Join Email List</li>'
    +'<li class="menuItem" id="menu-events">Event Calendar</li>'
    +'<li class="menuItem" id="menu-upcomming">Next Meeting</li>'
    +'<li class="menuItem" id="menu-news">news</li>'
    +'<li class="menuItem" id="menu-wiki">wiki</li>'
    +'<li class="menuItem" id="menu-game">GAME</li>'
    +'<li class="menuItem" id="menu-random">rando</li>'
    +'</ul></div>'
  );



  $startMenu.css('min-width',''+$('.taskbar-menu').outerWidth().toString()+'px');
  $startMenu.css('max-width',''+$('.taskbar-menu').outerWidth().toString()+'px');
  $startMenu.css('height','auto');
  $startMenu.css('bottom','0px');
  $startMenu.css('left','15px');
  $startMenu.css('position','absolute');
  $startMenu.css('display','none');
  $('.window-container').append($startMenu);

  $('#menu-email').click(function(){
    spawnWindow('email');
  });
  $('#menu-events').click(function(){
    spawnWindow('events');
  });
  $('#menu-upcomming').click(function(){
    spawnWindow('upcomming');
  });
 $('#menu-news').click(function(){
    spawnWindow('news');
  });
  $('#menu-wiki').click(function(){
    spawnWindow('wiki');
  });
  $('#menu-game').click(function(){
    spawnWindow('game');
  });
  $('#menu-random').click(function(){
    spawnWindow('random');
  });
  $('.window-container').click(function(){
    $startMenu.slideUp('fast');
  });

  $('.window-container').css('min-height', ($(document).height()-($('#siteHeader').outerHeight()+$('#siteNavBar').outerHeight()+$('.taskbar').outerHeight()))*0.9);
  $('#menu-email').click(function(){

  });
  var t = 2000;

  $('.window-container').append(
      '<div style="position:absolute, top:400px, left: 180px, height:100px, width:2px, background-color:green"><div class="progress-bar progress-bar-striped active" style="position:absolute, top:300, left: 180, height:10px, width:2px, background-color:green">'
      +'loading</div></div>'
    );
  $('.progress-bar').animate({
    width:"100%"
  },t);

  setTimeout(
    function(){
       $('.progress-bar').hide();
    },
    t+1000
  );
  setTimeout(
    function(){
      spawnWindow('wiki', 10, 100)
    },
    t+ 1000
  );
  setTimeout(
    function(){
      spawnWindow('news', 5, -20)
    },
    t+ 1200
  );
  setTimeout(
    function(){
      spawnWindow('email', 360, -10)
    },
    t+ 1500
  );
  setTimeout(
    function(){
      spawnWindow('events', 400, 180)
    },
    t+ 2000
  );  

  setTimeout(
    function(){
      spawnWindow('upcomming', 700, 180)
    },
    t+ 2200
  );    

}
