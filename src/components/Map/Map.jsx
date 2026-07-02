const Map = () => {
    return (
      <div className="w-full max-w-5xl mx-auto p-4">
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Ubicacion de Hostal Donde Maru en Valledupar"
            src="https://www.google.com/maps?q=10.4523593110531,-73.26415768060156&z=17&output=embed"
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
