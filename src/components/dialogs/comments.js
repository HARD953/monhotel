import { Dialog } from "primereact/dialog";
import CommentsCardSmall from "../cards/commentsCardSmall";

function CommentsAll({visible,setVisible}) {
    return (  
        <Dialog 
            header="Commentaires"
            visible={visible}
            onHide={() => setVisible(false)}>
            
            <div className="p-3">
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
                <CommentsCardSmall />
            </div>
            
        </Dialog>
    );
}

export default CommentsAll;