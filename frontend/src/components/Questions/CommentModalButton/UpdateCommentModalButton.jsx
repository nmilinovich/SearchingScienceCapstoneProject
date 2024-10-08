import { useState, useEffect, useRef } from "react";
// import { Link } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import UpdateCommentForm from "./UpdateCommentModal";
// import { getQuestionDetails } from "../../../store/questions";
import { FaRegEdit } from "react-icons/fa";
function UpdateCommentModalButton({comment, response, commentableType }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <OpenModalButton
      modalComponent={<UpdateCommentForm comment={comment} response={response} commentableType={commentableType} />}
      buttonText={<FaRegEdit size={20}/>}
      onButtonClick={() => setShowMenu(false)}
      // onModalClose={() => dispatch(getQuestionDetails(response.id))}
      customClass='commentModalButton'
    />
  );
}

export default UpdateCommentModalButton;
