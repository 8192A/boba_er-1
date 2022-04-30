

import React, { useState, useEffect } from "react";
import { getDocs, addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Columns, Card, Container, Image } from 'react-bulma-components';
import loc from '../img/Location.png';
import rev from '../img/rev.png';
import sug from '../img/Sweetener.png';
import ice from '../img/Cooling.png';
import dri from '../img/Cup.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
function Journal({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "bobaPosts");
  let navigate = useNavigate();
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div class='primary-background journal'>
        <Container>
          <Columns>
          <Columns.Column className="is-two-thirds" >
            {postLists.map((post) => {
              var date = new Date(post.timestamp);
              var day = date.getDay();
              var month = month[date.getMonth()-1]
              return (
                  <Card class="box">
                    <Columns>
                      <Columns.Column className="is-2">

                        <p class="date">day</p>
                        <p class="month">month</p>
                      </Columns.Column>

                      <Columns.Column className="is-2">
                        <p>LOCATION</p>
                        <p>DRINK</p>
                        <p>SUGAR</p>
                        <p>ICE</p>
                        <p>REVIEW</p>
                      </Columns.Column>
                      <Columns.Column>
                        <p><img width="16" height="16" src={loc}></img> {post.bobaStore}</p>
                        <p><img width="16" height="16" src={dri}></img> {post.drinkName}</p>
                        <p><img width="16" height="16" src={sug}></img> {post.sugarLevel}</p>
                        <p><img width="16" height="16" src={ice}></img> {post.iceLevel}</p>
                        <p><img width="16" height="16" src={rev}></img> demo review</p>
                      </Columns.Column>
                    </Columns>
                  </Card>
                
              )
            })}
            </Columns.Column>
            <Columns.Column>
              <DatePicker inline></DatePicker>
            </Columns.Column>
          </Columns>
        </Container>
      </div>
      );


    </div>
  );





  // return (
  //   <div class='primary-background journal'>
  //     <Container>
  //     <Columns>
  //       <Columns.Column className="is-two-thirds" >
  //         <Card class="box">
  //           <Columns>
  //             <Columns.Column className="is-2">
  //               <p class="date">13</p>
  //               <p class="month">Mar</p>
  //             </Columns.Column>

  //             <Columns.Column className="is-2">
  //               <p>LOCATION</p>
  //               <p>DRINK</p>
  //               <p>SUGAR</p>
  //               <p>ICE</p>
  //               <p>REVIEW</p>
  //             </Columns.Column>
  //             <Columns.Column>
  //               <p><img width="16" height="16" src={loc}></img> sample location</p>
  //               <p><img width="16" height="16" src={dri}></img> sample drink</p>
  //               <p><img width="16" height="16" src={sug}></img> sample sugar</p>
  //               <p><img width="16" height="16" src={ice}></img> sample ice</p>
  //               <p><img width="16" height="16" src={rev}></img> sample review</p>
  //             </Columns.Column>
  //             </Columns>
  //         </Card>
  //       </Columns.Column>

  //       <Columns.Column>
  //       <DatePicker inline></DatePicker>
  //       </Columns.Column>
  //     </Columns>
  //     </Container>
  //   </div>

  // );
}

export default Journal;