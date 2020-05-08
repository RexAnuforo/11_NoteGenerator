const util=require("util");

class Store{
    read(){
        return readFileAsync("db/db.json","utf8");
    }
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes(){
        return this.read().then(note => {
            let parsedNotes;
            try{
                parsedNotes =[].concat(JSON.parse(notes));
            }catch(err){
                parsedNotes= [];
            }
            return parsedNotes;
        });
    }

    addNote(note){
        const {title,text} = note;
        if(!title || !text){
            throw new err("there is no title or text in the space given");

        }
        const newNote ={title,text,id: uuidv1()};
        
        //Get all notes, add new note, write all updated notes, return newNote
        return this.getNotes()
            .then(notes => [...notes,newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNote(id){
        // Get all notes, rmove the note with given id, write the filtered notes
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !==id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports= new Store();
