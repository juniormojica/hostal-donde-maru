const Map = () => {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Ubicacion de Hostal Donde Maru en Valledupar"
            src="https://www.google.com/maps?q=Hostal%20Donde%20Maru%2C%20Valledupar%2C%20Cesar&output=embed"
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
