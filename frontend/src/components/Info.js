import FichaNoticia from "./FichaNoticia";

const Info = ({ avatar, user }) => {
  return (
    <main className="content">
      <article>
        <FichaNoticia />

        {/* <div className="botones">
                                    <button name="button_comentarios" className="comentarios">? Comentarios</button>
                                    <button name="button_cierto" className="like">Si</button>
                                    <button name="button_falso" className="disLike">No</button>
                                </div>  */}
      </article>
    </main>
  );
};

export default Info;
