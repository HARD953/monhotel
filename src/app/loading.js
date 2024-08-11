
import "@/assets/styles/loading.css"

export default function Loading() {
    return( 
    <section className="app_loading">
        <div className="app_loading__container">
            <h1 className="h1 fw-bolder text-center" > MyHot </h1>
            <div className="app_loading__spinner"></div>
        </div>
    </section>)
  }