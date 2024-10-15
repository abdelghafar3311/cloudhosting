import RegisterForm from "./RegisterForm"

function Register() {

  return (
    <section className="h container px-7 flex justify-center items-center m-auto">
      <div className="m-auto w-full p-5 rounded-lg md:w-2/3 bg-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Register</h1>
        <RegisterForm />
      </div>
    </section>
  )
}

export default Register