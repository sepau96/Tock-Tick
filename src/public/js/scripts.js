//Mostrar el nombre del archivo cuando lo seleccionas
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

//Script de funcionamiento del boton de subir imagen
$("#upload-body").hide();
$("#btn-upload").click((e) => {
  e.preventDefault();
  $("#upload-body").slideToggle();
});

//Script de funcionamiento del boton de subir comentarios
$("#post-comment").hide();
$("#btn-toggle-comment").click((e) => {
  e.preventDefault();
  $("#post-comment").slideToggle();
});

//Script de funcionamiento del boton de likes
$("#btn-like").click(function (e) {
  e.preventDefault();
  let imgId = $(this).data("id");

  $.post("/images/" + imgId + "/like").done((data) => {
    $(".likes-count").text(data.likes);
  });
});

//Script de funcionamiento del boton de borrar mediante peticion ajax
$("#btn-delete").click(function (e) {
  e.preventDefault();
  let $this = $(this);

  const response = confirm("Estas seguro de eliminar la imagen");

  if (response) {
    let imgId = $this.data("id");
    $.ajax({
      url: "/images/" + imgId,
      type: "DELETE",
    }).done(function (result) {
      $this.removeClass("btn-danger").addClass("btn-success");
      $this.find("i").removeClass("fa-times").addClass("fa-check");
      $this.append("<span> con exito</span>");
    });
  }
});
