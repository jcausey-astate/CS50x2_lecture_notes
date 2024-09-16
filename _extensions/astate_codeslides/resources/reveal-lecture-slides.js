<script>

var go_home = function() {
    window.location.href = '../';
};

window.onload = function exampleFunction() {
    var elements = document.getElementsByClassName("header-logo");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', go_home, false);
    }
}

</script>