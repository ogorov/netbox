//Set images by boolean value
function setImages(visible){
    let button = $("#toggle_device_images");
    let rack_elevation = $(".rack_elevation");

    button.children('span').removeClass('glyphicon-check glyphicon-unchecked');
    if(visible){
        $('.device-image', rack_elevation.contents()).removeClass('hidden');
        button.children('span').addClass('glyphicon-check');
        button.attr('selected', true);
    }
    else{
        $('.device-image', rack_elevation.contents()).addClass('hidden');
        button.children('span').addClass('glyphicon-unchecked');
        button.attr('selected', false);
    }
}

// Toggle the display of device images within an SVG rack elevation
$('#toggle_device_images').click(function() {
    var selected = $(this).attr('selected');
    $.ajax({
        url: "/dcim/rack-elevations/",
        type: 'POST',
        data: {
            'show_images': !selected,
            'csrfmiddlewaretoken': $("#csrfmiddlewaretoken").val()
        },
        datatype: "json"
      });

    setImages(!selected);
    return false;
});

//Initial images setting
$(".rack_elevation").on('load', function() {
    setImages($("#toggle_device_images").attr('selected'));
});
