import React from "react";
import { Image } from "react-bootstrap";

const RBImages = () => {
  return (
    <div>
      <h1>Exercise of Images</h1>
      <br />
      <h2>Avatar with name</h2>
      <Image
        src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
        rounded
        width={50}
      />
      <span className="fw-bold">Lucky Panwar</span>
      <br />
      <Image
        src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
        roundedCircle
        width={50}
      />
      <span className="fw-bold">Lucky Panwar</span>
      <br />
      <Image
        src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
        thumbnail
        width={50}
      />
      <span className="fw-bold">Lucky Panwar</span>
      <hr />
      <h2>Avatar size</h2>
      <Image
        src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
        roundedCircle
        width={50}
      />
      <Image
        src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
        roundedCircle
        width={55}
      />
      <Image
        src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
        roundedCircle
        width={60}
      />
      <Image
        src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
        roundedCircle
        width={65}
      />
      <Image
        src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg"
        roundedCircle
        width={70}
      />
      <hr />
      <h2>Avatar group</h2>
      <br />
      <div className="avatar-stack">
        <img src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg" alt="user1" className="avatar"/>
        <img src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg" alt="user2" className="avatar"/>
        <img src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg" alt="user3" className="avatar"/>
        <img src="https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg" alt="user4" className="avatar"/>
      </div>
    </div>
  );
};

export default RBImages;