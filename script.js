$(document).ready(function(){
	getList("https://pokeapi.co/api/v2/pokemon/");
});

function getList(address) {
	$("#loading").show();
	$("#pokelist").html("");
	$.get(address, function(data){
		// console.log(data);
		$(data.results).each(function(){
			// console.log($(this)[0].name);
			$("#pokelist").append('<a href="#" data-url="'+$(this)[0].url+'" class="list-group-item pokename">'+$(this)[0].name+'</a>');
		});
		var prevButton = $("#prevPage"),
		nextButton = $("#nextPage");
		prevButton.parent().addClass("disabled");
		prevButton.attr("disabled", "disabled").attr("href", "#");
		nextButton.parent().addClass("disabled");
		nextButton.attr("disabled", "disabled").attr("href", "#");
		if(data.previous){
			prevButton.parent().removeClass("disabled");
			prevButton.removeAttr("disabled").attr("href", data.previous);
		}
		if(data.next){
			nextButton.parent().removeClass("disabled");
			nextButton.removeAttr("disabled").attr("href", data.next);
		}
	}).done(function(){
		$("#loading").hide();
		$(".pokename").bind('click',function(){
			$("#pokedetail").hide();
			$("#warning").hide();
			$("#pokeloading").show();
			$(".pokename").removeClass("active");
			$(this).addClass("active");
			$.get($(this).data('url'), function(detail){
				console.log(detail);
				console.log(detail.name);
				console.log(detail.weight);
				console.log(detail.height);
				console.log(detail.base_experience);
				console.log(detail.types);
				console.log(detail.sprites.front_default);
				$("#pokemon_name").text(detail.name);
				$("#pokemon_image").attr('src', detail.sprites.front_default);
				$("#pokemon_image").data('default', detail.sprites.front_default);
				$("#pokemon_image").data('shiny', detail.sprites.front_shiny);
				$("#weight").text(detail.weight);
				$("#height").text(detail.height);
				$("#base_experience").text(detail.base_experience);
				$("#types").text("");
				$(detail.types).each(function(){
					$("#types").append('<span class="poketype">'+$(this)[0].type.name + "</span>");
				});
				$("#pokestats").html("");
				$(detail.stats).each(function(){
					var classAp = 'info';
					if($(this)[0].stat.name=="special-defense") classAp = 'success';
					if($(this)[0].stat.name=="special-attack") classAp = 'danger';
					if($(this)[0].stat.name=="defense") classAp = 'success';
					if($(this)[0].stat.name=="attack") classAp = 'danger';
					$("#pokestats").append($(this)[0].stat.name + ': '+ $(this)[0].base_stat +'<div class="progress"><div class="progress-bar progress-bar-'+ classAp +'" role="progressbar" aria-valuenow="'+ $(this)[0].base_stat +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ $(this)[0].base_stat +'%"><span class="sr-only">'+ $(this)[0].base_stat +'%</span></div></div>'
						);
				});
			}).done(function(){
				$("#pokedetail").fadeIn();
				$("#pokeloading").hide();
			});
		});

	}).fail(function(){
		alert("veri okunamadı");
	});
}

$(".change-page").bind('click', function(e){
	e.preventDefault();

	if(!$(this).parent().hasClass("disabled")){
		var address = $(this).attr("href");

		getList(address);
	}
});

$("#pokemon_image").hover(function(){
	$(this).attr("src", $(this).data('shiny'));
}, function(){
	$(this).attr("src", $(this).data('default'));
});
