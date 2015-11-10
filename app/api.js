export function status() {
  let url = 'http://bel.vcxl.nl:8081/api/v1/status';
  return fetch(url).then(response => response.json());
}

export function ring(room) {
  let url = 'http://bel.vcxl.nl:8081/api/v1/ring/'+room;
  return fetch(url, {method: "POST"}).then(response => response.json()); 
}