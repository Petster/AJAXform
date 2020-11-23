let sideHide = true;

function toggleSidebar() {
  if (sideHide) {
    document.getElementById("jsSidebar").classList.remove("hideSide");
    document.getElementById("jsSidebar").classList.add("unhideSide");
    document.getElementById("todoborder").classList.remove("todoHide");
    document.getElementById("todoborder").classList.add("todoShow");
    sideHide = false;
  } else {
    document.getElementById("jsSidebar").classList.remove("unhideSide");
    document.getElementById("jsSidebar").classList.add("hideSide");
    document.getElementById("todoborder").classList.add("todoHide");
    document.getElementById("todoborder").classList.remove("todoShow");
    sideHide = true;
  }
}
