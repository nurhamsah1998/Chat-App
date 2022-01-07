import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const signIn = () => {
    // auth.signInWithPopup(provider).catch(alert);
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-full">
      <div onClick={signIn} className="mx-auto mt-[25%] cursor-pointer hover:bg-indigo-700 active:bg-indigo-400 p-10 mt-5 relative bg-indigo-600 text-center w-[400px]  py-3 rounded-lg text-white font-bold">
        masuk
      </div>
    </div>
  );
}

export default Login;
