import React, {useState, useRef} from "react"
import '../App.css'


export default function DND({data, handleUpdate}){
    const [list, setList] = useState(data) //data table
    const [dragging, setDragging] = useState(false) //
    const [isActive, setIsActive] = useState(false) //state for button
    const [newCardText, setNewCardText] = useState("")


    //BUTTON FUNCTIONS
    function toggleActive(){
        setIsActive(prevState => (!prevState))
    }

    let dragItem = useRef()
    let dragNode = useRef()

    const handleDragStart = (e, params) => {
        dragItem.current = params
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() =>{
            setDragging(true)
        }, 0)
    }
    const handleDragEnter = (e, params) => {
        console.log('Entering drag event', params)
        const currentItem = dragItem.current
        if(e.target !== dragNode.current){
            console.log('Not same target')
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList)) //[...oldList] wont work perfectly
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                dragItem.current = params
                return newList
            })
        }
    }
    const handleDragEnd = () => {
        console.log ('Ending drag')
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null
        dragNode.current = null
    }
    const getStyles = (params) =>{
        const currentItem = dragItem.current
        if(currentItem.grpI === params.grpI && currentItem.itemI === params.itemI){
            return 'current card'
        }
        return 'card'
    }
    const progressBar = (title) => {
        return(
            title === data[0].title ? "todo-bar" : title === data[1].title ? "wip-bar" : "done-bar"
        )
    }
    return(
        <section className="table-wrapper">
            {list.map((grp, grpI) => (
                /* TABLE */
                <section 
                    key={grp.title}
                    className="table"
                    onDragEnter={dragging && !grp.items.length ? (e)=>handleDragEnter(e, {grpI, itemI:0}) : null }
                >
                    <h2 className="table-title">{grp.title}</h2>
                    {/* CARD */}
                    {grp.items.map((item, itemI) => (   
                        <div 
                            draggable 
                            onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}}
                            onDragEnter={dragging?(e) => {handleDragEnter(e, {grpI, itemI})} : null}
                            key={item}
                            className={dragging ? getStyles({grpI, itemI}) : "card"}
                        >
                            <div className={progressBar(grp.title)}></div>
                            {item}
                        </div>
                    ))}
                    <div className={` ${grp.title === "TODO" ? '' : 'active'} `}>
                        <button
                            className={`table-btn ${isActive===true ? 'active' : ''}`}
                            onClick={toggleActive} 
                        >
                            <span>+</span> Add a card
                        </button>
            
                        {/* ACCEPTING NEW INPUT*/}
                        <div className={`${isActive===false ? 'active': ''}`}>
                            <textarea 
                                className="newcard__detail"
                                placeholder="Enter detail for this card"
                                onChange= {(e) => {setNewCardText(e.target.value)}} 
                            >
                            </textarea><br/>

                            <div className="card__btn-wrapper">
                                <button
                                    className="add-btn"
                                    onClick={() => {handleUpdate(newCardText); toggleActive()}}  
                                >
                                    Add card
                                </button>
                                <button
                                    className="cancel-btn"
                                    onClick={toggleActive} 
                                >
                                    X
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    
                </section>

            ))}
        </section>
    )
}