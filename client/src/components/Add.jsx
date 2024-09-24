import {ethers} from "ethers"

const Add=({state})=>{
    const addFunds = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = "Admin";
      const message = "Added Funds";
      const funds = {value:ethers.utils.parseEther("0.01")}

      const transaction = await contract.addFunds(name, message, funds);
      await transaction.wait();
      alert("transaction successful");
      window.location.reload();
    
    }
    return<> 
      <h1>Admin Form</h1>
      <form onSubmit={addFunds}>
        <button>Add Funds</button>
        <p><br></br></p>
      </form>
    </>
}
export default Add;