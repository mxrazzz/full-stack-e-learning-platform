// App.js
import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "./redux/notificationSlice"; // Ensure correct import paths

// Lazy loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ExplorerPlan = lazy(() => import("./plans/ExplorerPlan"));
const RevertPlan = lazy(() => import("./plans/RevertPlan"));
const NextStepsPlanPlan = lazy(() => import("./plans/NextStepsPlan"));
const CourseContent = lazy(() => import("./plans/CourseContent"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleContent = lazy(() => import("./pages/ArticleContent"));
const Tools = lazy(() => import("./pages/Tools"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const VerificationCodePage = lazy(() => import("./pages/VerificationCodePage"));
const RegistrationVerificationPage = lazy(() =>
  import("./pages/RegistrationVerificationPage")
);
const ViewProfile = lazy(() => import("./components/ViewProfile")); // Adjust the path as necessary
const Quiz = lazy(() => import("./plans/Quiz"));

const NotFoundPage = () => (
  <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div className="max-w-md text-center">
        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl font-semibold md:text-3xl">
          Sorry, we couldn't find this page.
        </p>
        <p className="mt-4 mb-8 dark:text-gray-600">
          But don't worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          to="/"
          className="px-8 py-3 font-semibold rounded bg-[#D4AF37] text-[#1A365D]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  </section>
);

//Notification functions

const GlobalNotification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.visible, dispatch]);
  if (!notification.visible) return null;

  return (
    <div className="fixed top-16 right-4 z-50 max-w-xl px-4 py-2 border-l-4 border-[#C9A567] rounded-lg shadow-md overflow-hidden divide-x divide-gray-300 bg-[#FFF7E0] text-[#5C3D2E] animate-slide-in">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-1 flex-col p-2">
          <span className="text-sm">{notification.message}</span>
        </div>
        <button
          className="px-2 flex items-center text-sm uppercase tracking-wide"
          onClick={() => dispatch(hideNotification())}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <GlobalNotification />
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleContent />} />
          <Route path="/tools" element={<Tools />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verification-code" element={<VerificationCodePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/verify-registration"
            element={<RegistrationVerificationPage />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-profile"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plans/explorer"
            element={
              <ProtectedRoute>
                <ExplorerPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plans/revert"
            element={
              <ProtectedRoute>
                <RevertPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plans/existing"
            element={
              <ProtectedRoute>
                <NextStepsPlanPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course-content/:moduleId"
            element={
              <ProtectedRoute>
                <CourseContent />
              </ProtectedRoute>
            }
          />
          <Route path="/quiz/:quizId" element={<Quiz />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
