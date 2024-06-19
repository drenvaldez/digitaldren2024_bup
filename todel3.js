function insertDiv() {
  // Create a new div element
  var newDiv = document.createElement('div');
  
  // Set some attributes or styles
  newDiv.id = 'myNewDiv';
  newDiv.style.width = '100%';
  newDiv.style.height = '100px';
  newDiv.style.backgroundColor = '#f0f0f0';
  newDiv.textContent = 'This is a new div inserted by JavaScript!';

  // Insert the new div into the body
  document.body.appendChild(newDiv);
}

// Optionally, automatically call the function when the script loads
// insertDiv();
