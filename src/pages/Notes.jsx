import React, { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(0);
  // read data from : http://localhost:4000/notes
  // create data from : http://localhost:4000/notes

  useEffect(() => {
    const fetchNotes = async () => {
      let resp = await fetch("http://localhost:4000/notes");
      let data = await resp.json();
      setNotes(data);
    };
    fetchNotes();
    setInput("");
  }, [show]);

  // first form methods
  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("http://localhost:4000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 1000000000),
        note: input,
      }),
    });
    setShow(show + 1);
  };

  const handleDelete = async id => {
    // console.log(id);

    await fetch(`http://localhost:4000/notes/${id}`, {
      method: "DELETE",
    });
    setShow(show + 1);
  };

  // second form methods
  const handleSubmit2 = async e => {
    e.preventDefault();
    console.log(id, input2);
    await fetch(`http://localhost:4000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: input2 }),
    });

    setShow(show + 1);
    setInput2("");
    setId("");
  };

  const handleUpdate = data => {
    setInput2(data.note);
    setId(data.id);
  };

  return (
    <section className="flex flex-col h-[100vh] overflow-scroll">
      <article className="flex flex-col gap-10 h-[100%] bg-slate-200 items-center">
        <h1 className="text-4xl font-bold">Notes App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write Something..."
            className="border-2 border-slate-300  p-2 text-2xl rounded-xl"
            onChange={e => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button className="border-2 border-slate-300  p-2 text-2xl rounded-xl bg-emerald-400  hover:bg-emerald-300">
            Create
          </button>
        </form>

        {notes.length === 0 ? (
          <h1 className="text-4xl mt-32">Notes not Available!!</h1>
        ) : (
          <div className="flex flex-wrap gap-5">
            {notes.map(data => {
              return (
                <div
                  key={data.note + data.id}
                  className="bg-emerald-200 p-3 rounded-lg font-semibold"
                >
                  <h2>{data.note}</h2>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-xl mt-9"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="ml-4 bg-slate-600 text-white px-3 py-1 rounded-xl mt-9"
                    onClick={() =>
                      handleUpdate({ id: data.id, note: data.note })
                    }
                  >
                    Update
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <form
          onSubmit={handleSubmit2}
          className="bg-slate-400 fixed bottom-0 w-[100vw] p-2 px-32"
        >
          <input
            type="text"
            placeholder="Write Something..."
            className="border-2 border-slate-300  p-2 text-2xl rounded-xl w-[70%]"
            value={input2}
            onChange={e => {
              setInput2(e.target.value);
            }}
          />
          <button className="border-2 border-slate-300  p-2 text-2xl rounded-xl bg-emerald-400 w-[20%]  hover:bg-emerald-300">
            Update
          </button>
        </form>
      </article>
    </section>
  );
};

export default Notes;
