const styles = {
  
  pageContainer: {
    background: 'linear-gradient(to right, #3498db, #2ecc71)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px', // Adjust the padding as needed
  },
  editContainer: {
    padding: '10px',
    borderRadius: '5px',
    margin: '20px',
    border: '1px solid #ccc',
    
  },
  
  container: {
    maxWidth: '90%',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    borderRadius: '8px',
    background: 'linear-gradient(to right, #3498db, #2ecc71)', // Corrected
  },

 heading: {
  fontSize: 27,
  marginBottom: '10px',
  background: 'linear-gradient(to right, #3498db, #2ecc71)',
  fontFamily: 'Arial, sans-serif',
  borderRadius: '8px',
  padding: '15px',
},

box:
 {
  background: 'linear-gradient(to right, #87CEEB, #3CB371)',
  padding: '20px',
  borderRadius: '12px',
  
},

image:
 {
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '2px solid #527853', 
        objectFit: 'cover',
        margin: '5px',
        width: '50%',
        height: 'auto',
      },

imageInstrutor:{
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '2px solid #527853', 
    objectFit: 'cover',
    width: '50px',
    height: '50px',
    margin: '3px',
      },   

cancelButton: {
    marginRight: '30px',
},
  
courseDetailBox: {
        maxWidth: '700px', // Pas de maximale breedte aan naar wens
        margin: 'auto',
        marginBottom: '20px', // Pas de onderste marge aan naar wens
      },

    
};
 export default styles;