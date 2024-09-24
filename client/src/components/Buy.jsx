import {ethers} from "ethers"

const Buy=({state})=>{

    const buyPhoto = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = document.querySelector("#name").value;
      const message = document.querySelector("#message").value;

      const transaction = await contract.sellPhoto(name,message);
      await transaction.wait();
      alert("transaction successful");
      window.location.reload();
    }
    return<>
      <h1>User Form</h1>
      <form onSubmit={buyPhoto}>
        <div className ="inputbox">
          <span>Name: </span>
          <input required="required" id ="name"></input>
        </div>
        <div className ="inputbox">
          <span>Location: </span>
          <input required="required" id ="message"></input>
        </div>
        <lr-file-uploader-minimal
          css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-minimal.min.css"
          ctx-name="my-uploader"
          class="my-config"
          required = "required"
        >
        </lr-file-uploader-minimal>
        <button>receive ether</button>
        <p><br></br></p>
      </form>
    </>
}
export default Buy;