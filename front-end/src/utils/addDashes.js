function addDashes(f) {
  f.value = f.value.split("-").join("");
  f.value = f.value.replace(/[^0-9-]/g, "");
  f.value = f.value.replace(
    /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/,
    "$1$2$3-$4$5$6-$7$8$9$10"
  );
}

export default addDashes;
