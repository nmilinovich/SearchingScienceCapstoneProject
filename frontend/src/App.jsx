import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import QuestionsLandingPage from './components/Questions/QuestionsLandingPage';
import QuestionDetailsPage from './components/Questions/QuestionDetailsPage';
import PostQuestionPage from './components/Questions/PostQuestionPage/PostQuestionPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <QuestionsLandingPage />
      },
      {
        path: 'questions',
        element: <QuestionsLandingPage />
      },
      {
        path: 'questions/new',
        element: <PostQuestionPage />
      },
      {
        path: 'questions/:questionId',
        element: <QuestionDetailsPage />
      },

      {
        path: "login",
        element: <LoginFormPage />
      },
      {
        path: "signup",
        element: <SignupFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
