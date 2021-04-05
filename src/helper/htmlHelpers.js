export default function setManyAttributes(element, attrs) {
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}
