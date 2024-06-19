<script>
// createDiv.js

document.addEventListener("DOMContentLoaded", function() {
    // Create a new div element
    const newDiv = document.createElement('div');
    
    // Set some properties for the new div
    newDiv.id = 'external-div';
    newDiv.style.width = '200px';
    newDiv.style.height = '200px';
    newDiv.style.backgroundColor = 'lightblue';
    newDiv.innerHTML = '<p>This div is created from an external script!</p>';
    
    // Append the new div to the body
    document.body.appendChild(newDiv);
});
  
</script>
