for(var i=0;i<=document.getElementsByTagName("nav")[0].childElementCount-1;i++){
		if(window.location.href.indexOf(document.getElementsByTagName("nav")[0].children[i].href) >= 0)
			document.getElementsByTagName("nav")[0].children[i].style.backgroundColor = "blue";
}
if(dc("formContato") != null){
	campos = [dc("formContatoNome"), dc("formContatoE-mail"), dc("formContatoAssunto"), dc("formContatoMensagem")];
	for(let i=0;i<=campos.length-1;i++){
		campos[i].children[1].onblur = function(){validarCampos(i)};
	}
	dc("formContato").onsubmit = function(){
		if(validarTodosCampos())
			criarComentario(campos[0].children[1].value,campos[1].children[1].value,campos[2].children[1].value,campos[3].children[1].value);
		return false;
		
		}; //Sempre retornará false porque preciso simular os comentários
}
if(dcs("btnToggle").length > 0){
	for(let i=0;i<=dcs("btnToggle").length-1;i++){
		dcs("btnToggle")[i].onclick = function(){tutorialToggle(i)};
	}
}
if(dc("tButton") != null)
	dc("tButton").onclick = function(){
		var display = document.getElementsByTagName("nav")[0].children[1].style.display;
		if(display == "" || display == "none")
			display = "block";
		else
			display = "none";
		for(var i=1;i<=document.getElementsByTagName("nav")[0].childElementCount-1;i++)
			document.getElementsByTagName("nav")[0].children[i].style.display = display;
	};
if(dc("searchButton") != null)
	dc("searchButton").onclick = function(){
		location.href = "https://www.google.com/search?q=site:megamitensei.wikia.com "+dc("s").value;
		return false;
	}
function dc(id){
	return document.getElementById(id);
}
function dcs(classe){
	return document.getElementsByClassName(classe);
}
var contadorSpam = false;
var primeiraVez = true;
function tutorialToggle(n){
	if(dcs("btnToggle")[n].children[0].className == "fa fa-arrow-down"){
		dcs("btnToggle")[n].children[0].className = "fa fa-arrow-up";
		dcs("caixaTutorial")[n].lastElementChild.style.display = "block";
	}
	else{
		dcs("btnToggle")[n].children[0].className = "fa fa-arrow-down";
		dcs("caixaTutorial")[n].lastElementChild.style.display = "none";
	}
}
function validarTodosCampos(){
	var validados = true;
	for(let i=0;i<=campos.length-1;i++){
		if(validarCampos(i) == true)
			validados = false;
	}
	return validados;
}
function validarCampos(nCampo){
	visibility = "hidden";
	outline = "none";
	dadoIncorreto = false;
	if ((nCampo == 0) && (campos[0].children[1].value.replace(/ /g,"") == "") ||
		((nCampo == 1) && (!/^\w([\-\+\_\.](?![\-\+\_\.])|\w(?=[\w\-\+\_\.])){1,}\w@\w([\-\+\_\.](?![\-\+\_\.])|\w(?=[\w\-\+\_\.])){1,}\w$/.test(campos[1].children[1].value))) ||
		/*
		A expressão regular acima valida o e-mail da seguinte forma:
		Impede que carácteres especiais sejam usados em sequência, exemplo: leandro..musser@gmail.com
		Impede que carácteres especiais sejam usados no início, antes do @, depois do @ e no fim
		Impede que menos de três carácteres sejam usados antes e/ou depois do @.
		*/
		((nCampo == 2) && (campos[2].children[1].value.replace(/ /g,"") == "")) ||
		((nCampo == 3) && (campos[3].children[1].value.replace(/ /g,"") == ""))){
			visibility = "visible";
			outline = "1px solid red";
			dadoIncorreto = true;
		}
	campos[nCampo].children[1].style.outline = outline;;
	campos[nCampo].children[2].style.visibility = visibility;
	return dadoIncorreto;
}
if(dc("paginaComentarios") != null){
	function criarComentario(nome,email,assunto,mensagem){
		if(contadorSpam == false){
			var data = new Date();
			dc("paginaComentarios").innerHTML =
				data.getHours()+"h:"+data.getMinutes()+"m:"+data.getSeconds()+ "s - "+data.getDate()+"-"+parseInt(data.getMonth()+1)+"-"+data.getFullYear() +
				"<div class='comentario'>"+
					"<div><span style='font-weight: bold;'>De: </span> "+(nome+" - "+email).replace(/<.*?>/g,"")+"</div>"+
					"<div><span style='font-weight: bold'>Assunto: </span> "+(assunto).replace(/<.*?>/g,"")+"</div>"+
					"<div><span style='font-weight: bold'>Mensagem: </span> "+(mensagem).replace(/<.*?>|[%&]/g,"")+"</div>"+
				"</div>" + dc("paginaComentarios").innerHTML;
				MSGsucesso();
				if(primeiraVez){
					window.setTimeout(function(){var dataAgora = new Date(); criarComentarioFake("Ana Beatriz","O fim está próximo!","Ei, "+nome+", saia daqui enquanto ainda há tempo! O fim está próximo e o cramunhão já preparou um lugar especial para todos vocês!",dataAgora.getHours()+"h:"+dataAgora.getMinutes()+"m:"+dataAgora.getSeconds()+ "s - "+dataAgora.getDate()+"-"+parseInt(dataAgora.getMonth()+1)+"-"+dataAgora.getFullYear())},8050);
					window.setTimeout(function(){var dataAgora = new Date(); criarComentarioFake("<span style='color:red; font-weight:bold'>Administrador</span>","Eu avisei.","Ana Beatriz banida por continuar enchendo o saco mesmo após alertada. Procure outro lugar para fazer essas suas maluquices.",dataAgora.getHours()+"h:"+dataAgora.getMinutes()+"m:"+dataAgora.getSeconds()+ "s - "+dataAgora.getDate()+"-"+parseInt(dataAgora.getMonth()+1)+"-"+dataAgora.getFullYear())},20500);
					window.setTimeout(function(){var dataAgora = new Date(); criarComentarioFake("Ricardo","Valaaaaaaa","Até nunca mais, mulher doida kkkkkkkkkkkkkkkkkkkk.",dataAgora.getHours()+"h:"+dataAgora.getMinutes()+"m:"+dataAgora.getSeconds()+ "s - "+dataAgora.getDate()+"-"+parseInt(dataAgora.getMonth()+1)+"-"+dataAgora.getFullYear())},30000);
				primeiraVez = false;
				}
		}
	}
	function criarComentarioFake(nome,assunto,mensagem,data){
			dc("paginaComentarios").innerHTML =
				data +
				"<div class='comentario'>"+
					"<div style='background-color:#00BFFF'><span style='font-weight: bold;'>De:</span> "+nome+"</div>"+
					"<div style='background-color:#00BFFF'><span style='font-weight: bold'>Assunto:</span> "+assunto+"</div>"+
					"<div><span style='font-weight: bold'>Mensagem: </span> "+mensagem+"</div>"+
				"</div>"+dc("paginaComentarios").innerHTML;
	}
	criarComentarioFake("Ana Beatriz","Vou orar por vocês.","Há muito satanismo presente no site, não recomendo. Espero que todos vocês queimem no fogo do inferno!","23h:21m:41s - 17/12/2017");
	criarComentarioFake("Ricardo","Olha essa doida aí","Kkkkkkkkkkkk","4h:43m:21s - 18/12/2017");
	criarComentarioFake("<span style='color:red; font-weight:bold'>Administrador</span>","Comentário indevído.","Ana, poste mais outra mensagem do mesmo nível e eu bano você. Não vamos aceitar esse tipo de coisa aqui.","9h:28m:51s - 18/12/2017");
	criarComentarioFake("Ana Beatriz","Desculpe.","Não irei fazer de novo, eu prometo.","1h:54m:26s - 19/12/2017");
	function MSGsucesso(){
		dc("mensagemComentario").innerHTML = "<span style='color:green'>Comentário enviado com sucesso!</span>";
		window.setTimeout(function(){MSGSpam(10)},2000);
	}
	function MSGSpam(segundos){
		if(contadorSpam == false)
			contadorSpam = segundos;
		dc("mensagemComentario").innerHTML = "<span style='color:red'>Você precisa aguardar "+contadorSpam+" segundo(s) para postar de novo.</span>";
		contadorSpam--;
		if(contadorSpam == 0){
			contadorSpam = false;
			setTimeout(function(){MSGSpamDeletar()},1000);
		}
		else
			setTimeout(function(){MSGSpam()},1000);
	}
	function MSGSpamDeletar(){
		dc("mensagemComentario").innerHTML = "";
	}
}
//##############################################################################################################################################
//#######  CRIADO POR LEANDRO ROCHA MUSSER CARNEIRO  #######################    leandro.musser@gmail.com    ####################################
//#######  ÁREA ABAIXO PERTENCE AOS DEMÔNIOS  ##################################################################################################
//##############################################################################################################################################
if(dc("caixaMestre") != null){
	function skillId(nome){
		for(var i=0;i<=Skills.length-1;i++){
			if (Skills[i][0] == nome)
				return i;
		}
	}
	atualizarTotalDemons();
	dc("closeBox").onclick = function(){dc("helpBox").style.display="none"; dc("closeBox").style.display="none"};
	dc("apagarBusca").onclick = function(){apagarBuscas()};
	demonNames = [];
	for(var i=0;i<=Demons.length-1;i++){
		demonNames[i] = Demons[i].Name;
	}
	for(var i=0;i<=demonNames.length-1;i++){
		for(var j=0;j<=demonNames.length-2;j++){
			if(demonNames[i] < demonNames[j]){
				temp = demonNames[j];
				demonNames[j] = demonNames[i];
				demonNames[i] = temp;
			}
		}
	}
	for(var q=0;q<=attr.length-1;q++){
			if(q==0){
				dc("filtro").children[1].children[0].children[0].innerHTML += "<option></option>";
				dc("filtro").children[1].children[0].children[0].innerHTML += "<option>-</option>";	
			}
			dc("filtro").children[0].children[0].innerHTML += "<option>"+attr[q]+"</option>";
			dc("filtro").children[1].children[0].children[0].innerHTML += "<option>"+attr[q]+"</option>";
	}
	for(var i=0;i<=demonNames.length-1;i++){
		if(i == 0)
			dc("searchArea").children[0].children[0].innerHTML += "<option>* Escolha um demônio</option>";
			dc("searchArea").children[0].children[0].innerHTML += "<option>"+demonNames[i]+"</option>";
	}
	for(var i=0;i<=racaNames.length-1;i++){
		if(i == 0)
			dc("filtro").children[1].children[2].children[0].innerHTML += "<option></option>";
		dc("filtro").children[1].children[2].children[0].innerHTML += "<option>"+racaNames[i]+"</option>";
	}
	for(var i=0;i<=Skills.length-1;i++){
		if(i == 0)
			dc("filtro").children[1].children[1].children[0].innerHTML += "<option></option>";
		dc("filtro").children[1].children[1].children[0].innerHTML += "<option>"+SkillsO[i]+"</option>";
	}
	dc("selectArea").children[0].onchange = function(){criarDemonPorNome(this.value,true)};
	dc("searchDemon").children[0].onkeyup = function(){caixaDemonAjuda(this.value); window.setTimeout(function(){pesquisarPorDigitacao(dc("searchDemon").children[0].value),850})};
	dc("searchDemon").children[0].onmousedown = function(){pesquisarPorDigitacao(this.value)};
	function pesquisarPorDigitacao(valorDigitado){
		dc("selectArea").children[0].selectedIndex = 0;
		apagarCaixaMestre();
		if (valorDigitado != "" && valorDigitado.length >1){
			var regex = new RegExp(valorDigitado,"gi");
			var podeCriar = false;
			for(var i=0;i<=Demons.length-1;i++){
				for(var q=0;q<=Demons[i].Skills.length-1;q++){
					if(regex.test(Skills[Demons[i].Skills[q]][0])){
						podeCriar = true;
					}
				}
				if(Demons[i].Name.toLowerCase().match(valorDigitado.toLowerCase()))
					podeCriar = true;
				if(podeCriar)
					criarDemon(i,false,valorDigitado,valorDigitado);
				podeCriar = false;
			}
		}
		caixaDemonAjuda(valorDigitado);
	}
	function checkResitencia(demon){
		for(var q=0;q<=dc("filtro").children[0].children[0].childElementCount-1;q++){
			if(dc("filtro").children[0].children[0].children[q].selected){
				if ((Demons[demon].Reflects.indexOf(dc("filtro").children[0].children[0].children[q].value) < 0) &&
					(Demons[demon].Absorbs.indexOf(dc("filtro").children[0].children[0].children[q].value) < 0) &&
					(Demons[demon].Void.indexOf(dc("filtro").children[0].children[0].children[q].value) < 0) &&
					(Demons[demon].Resists.indexOf(dc("filtro").children[0].children[0].children[q].value) < 0))
						return false
			}
		}
		return true
	}
	function checkWeak(demon){
		var result = false;
		for(var q=0;q<=dc("filtro").children[1].children[0].children[0].childElementCount-1;q++){
			if(dc("filtro").children[1].children[0].children[0].children[q].selected)
				if(Demons[demon].Weak.indexOf(dc("filtro").children[1].children[0].children[0].children[q].value) >= 0){
					result = true;
					q = dc("filtro").children[1].children[0].children[0].childElementCount-1;
				}
		}
		if(!result)
			return false
		else
			return true
	}
	function checkSkill(demon){
		for(var q=0;q<=Demons[demon].Skills.length-1;q++){
			if(Skills[Demons[demon].Skills[q]][0] == dc("filtro").children[1].children[1].children[0].value)
				return true;
		}
		return false;
	}
	function checkRaca(demon){
		if(dc("filtro").children[1].children[2].children[0].value == Demons[demon].Race)
			return true;
		else
			return false;
	}
	function checkLevel(demon){
		if (dc("filtro").children[1].children[3].children[0].value == "")
			dc("filtro").children[1].children[3].children[0].value = 1;
		if (dc("filtro").children[1].children[3].children[1].value == "")
			dc("filtro").children[1].children[3].children[1].value = 99;
		
		if((dc("filtro").children[1].children[3].children[0].value <= Demons[demon].Level) &&
			(dc("filtro").children[1].children[3].children[1].value >= Demons[demon].Level)){
			return true;
		}
		else{
			return false;
		}
	}
	function apagarBuscas(){
		dc("filtro").children[1].children[0].children[0].selectedIndex = 0;
		dc("filtro").children[1].children[1].children[0].selectedIndex = 0;
		dc("filtro").children[1].children[2].children[0].selectedIndex = 0;
		dc("filtro").children[1].children[3].children[0].value = 1;
		dc("filtro").children[1].children[3].children[1].value = 99;
		for(var q=0;q<=dc("filtro").children[0].children[0].childElementCount-1;q++)
			dc("filtro").children[0].children[0].children[q].selected = false;
	}
	function searchMaster(){
		dc("selectArea").children[0].selectedIndex = 0;
		apagarCaixaMestre();
		var numTrue = 0;
		var numTrueVetor = 0;
		var comandos = [false,false];
		
		for(var q=0;q<=dc("filtro").children[0].children[0].childElementCount-1;q++)
			if(dc("filtro").children[0].children[0].children[q].selected){
				comandos[0] = true;
				q = dc("filtro").children[0].children[0].childElementCount;
			}
			if (dc("filtro").children[1].children[0].children[0].selectedIndex != 0)
				comandos[1] = true;
			if(dc("filtro").children[1].children[1].children[0].selectedIndex > 0)
				comandos[2] = true;
			if(dc("filtro").children[1].children[2].children[0].selectedIndex > 0)
				comandos[3] = true;
		for(var i=0;i<=Demons.length-1;i++){
			if(comandos[0] == true){
				if(checkResitencia(i))
					numTrue++;
			}
			if(comandos[1] == true){
				if(checkWeak(i)){
					numTrue++;
				}
			}
			if(comandos[2] == true){
				if(checkSkill(i))
					numTrue++;
			}
			if(comandos[3] == true){
				if(checkRaca(i))
					numTrue++;
			}
			for(var q = 0;q<=comandos.length-1;q++){
				if(comandos[q] == true)
					numTrueVetor++;
			}
			if(numTrue > 0)
				if(numTrueVetor > 0)
					if(numTrue == numTrueVetor)
						if(checkLevel(i))
							criarDemon(i,false,"",dc("filtro").children[1].children[1].children[0].value);
			numTrue = 0;
			numTrueVetor = 0;
		}
	}
	function pesquisarSkillPorNome(n){
		apagarCaixaMestre();
		for(var i=0;i<=Demons.length-1;i++){
			for(var q=0;q<=Demons[i].Skills.length-1;q++){
				if(n.toLowerCase() == (Skills[Demons[i].Skills[q]][0]).toLowerCase()){
					criarDemon(i,false,'','');
					q = Demons[i].Skills.length;
				}
			}
		}
	}
	function caixaDemonAjuda(n){
		var lc = [];
		if(n != ""){
			dc("helpBox").innerHTML = "";
			var regex = new RegExp('('+n+')','i');
			for(var q=0;q<=SkillsO.length-1;q++){
				if(regex.test(SkillsO[q]))
					lc.push(SkillsO[q]+' (Skill)');
			}
			for(var i=0;i<=Demons.length-1;i++){
				if(regex.test(Demons[i].Name))
					lc.push(Demons[i].Name);
			}
		}
		for(var q=0;q<=lc.length-1;q++){
			for(var i=0;i<=lc.length-2;i++){
				if(lc[q] < lc[i]){
					temp = lc[i];
					lc[i] = lc[q];
					lc[q] = temp;
				}
			}
		}
		for(var q=0;q<=lc.length-1;q++){
			dc("helpBox").innerHTML += "<div id='"+lc[q].replace(/ \(Skill\)/,'')+"'>"+lc[q].replace(regex,"<span style='color:#9400D3; font-weight:bold'>$1</span>")+"</div>";
		}
		for(var i=0;i<=dc("helpBox").childElementCount-1;i++){
			dc("helpBox").children[i].onclick = function(){dc("searchDemon").children[0].value = this.id;pesquisarPorDigitacao(this.id);dc("helpBox").style.display="none";dc("closeBox").style.display="none"};
		}
		if (dc("helpBox").innerHTML == "" || n == ""){
			dc("helpBox").style.display="none";
			dc("closeBox").style.display="none";
		}
		else{
			dc("helpBox").style.display="block";
			dc("closeBox").style.display="block";
		}
	}
	function criarDemonPorRaca(r){
		apagarCaixaMestre();
		for(var i=0;i<=Demons.length-1;i++){
			if(Demons[i].Race == r)
				criarDemon(i,false,'','');
		}
	}
	function criarDemonPorNome(n,apagar){
		for(var i=0;i<=Demons.length-1;i++){
			if(Demons[i].Name == n){
				return criarDemon(i,apagar,'','');
			}
		}
	}
	function esconderSkill(pai){
		if(pai.children[1].style.display == "block"){
			pai.children[1].style.display="none";
			pai.children[2].style.display="none";
			pai.children[0].children[0].className = "fa fa-caret-down";
			
		}
		else{
			pai.children[1].style.display="block";
			pai.children[2].style.display="block";
			pai.children[0].children[0].className = "fa fa-caret-up";
		}
	}
	function atualizarTotalDemons(){
		if(dc("caixaMestre").childElementCount == 0)
			dc("demonsNaTela").innerHTML = "<span style='color:red; font-weight:bold'>Não há demônios sendo mostrado(s) no momento.</span>"
		else
			dc("demonsNaTela").innerHTML = "<span style='color:blue; font-weight:bold'>Há "+dc("caixaMestre").childElementCount+" demônio(s) sendo mostrado(s) no momento.</span>";
	}
	function apagarCaixaMestre(){
		dc("caixaMestre").innerHTML = "";
		atualizarTotalDemons();
	}
	function criarDemon(n,apagar,sub,subskill){
		if(apagar)
			dc("caixaMestre").innerHTML = "";
		var regex = new RegExp('('+sub+')',"gi");
		var regexSkill = new RegExp('('+subskill+')',"gi");
		skills = "";
		skills +=  
		'<div class="caixaDemon">'+
			'<div class="caixaDemonWhoIs">'+
				'<img src="'+Demons[n].Image+'.jpg"/>'+
				'<div>'+Demons[n].Name.replace(regex,'<span style="color:#9400D3">'+'$1</span>')+'</div>'+
				'<div>('+Demons[n].Race+' - Level '+Demons[n].Level+')</div>'+
				'<div><br>('+Demons[n].Obtainable+')</div>'+
			'</div>'+
			'<div class="caixaDemonStats">'+
				'<div>STR <span>'+Demons[n].Strength+' </span></div><div>MAG <span>'+Demons[n].Magic+'</span></div><div>VIT <span>'+Demons[n].Vitality+' </span></div><div>AGI <span>'+Demons[n].Agility+'</span></div><div>LCK <span>'+Demons[n].Luck+'</span></div><hr><div>HP <span>'+Demons[n].HP+'</span></div><div>MP  <span>'+Demons[n].MP+'</span></div>'+
			'</div>'+
			'<div class="caixaDemonSkills">';
		for(var i=0;i<=Demons[n].Skills.length-1;i++){
			if (Demons[n].SkillLevel[i] != "Innate")
				var levelStr = "Level ";
			else
				var levelStr = "";
			skills += 			
				'<div onclick=esconderSkill(this)>'+
					'<div><i class="fa fa-caret-down" aria-hidden="true" style="float:left"></i>'+(Skills[Demons[n].Skills[i]][0]+' ('+levelStr+Demons[n].SkillLevel[i]).replace(regexSkill,'<span style="color:#9400D3">'+'$1</span>')+') </div>'+
					'<div style="display: none">'+Skills[Demons[n].Skills[i]][1]+'</div>'+
					'<div style="display: none">'+Skills[Demons[n].Skills[i]][2]+'</div>'+
				'</div>';
		}
		skills +=  
			'</div>'+
			'<div class="caixaDemonResist">'+
			
				'<div><span>Reflects</span>'+
				'<span>'+Demons[n].Reflects+'</span></div>'+		
				'<div><span>Resists</span>'+
				'<span>'+Demons[n].Resists+'</span></div>'+
				'<div><span>Absorbs</span>'+
				'<span>'+Demons[n].Absorbs+'</span></div>'+
				'<div><span>Void</span>'+
				'<span>'+Demons[n].Void+'</span></div>'+
				'<div><span>Weak</span>'+
				'<span>'+Demons[n].Weak+'</span></div>'+
			'</div>'+
		'</div>';
		dc("caixaMestre").innerHTML += skills;
		atualizarTotalDemons();
	}
}