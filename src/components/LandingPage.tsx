import logo from '/crops.svg' // Replace with the path to your logo

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-200">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />
      <h1 className="mb-6 text-4xl font-bold text-gray-700">
        Welcome to GrowSmart
      </h1>
      <p className="w-1/2 mb-8 text-lg text-gray-600">
        We assist farmers in managing their crop production and provide support
        to Provincial Agriculture in monitoring the crop production of farmers.
      </p>
    </div>
  )
}

export default LandingPage
