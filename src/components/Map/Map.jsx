const Map = () => {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe 
            title="Ubicacion de Hostal Donde Maru en Valledupar"
            src="https://www.google.com/maps/embed?pb=!4v1737390562768!6m8!1m7!1sMB7GKTIc64c1ZZmKqRCFxQ!2m2!1d10.4523593110531!2d-73.26415768060156!3f29.198432498013545!4f5.655902481382483!5f0.7820865974627469" 
            className="absolute top-0 left-0 w-full h-full"
            style={{border: 0}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    );
  };
  
  export default Map;
