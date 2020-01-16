export default function Search(props) {

    function inputChange(ev) {
        let input = ev.target.value
        props.handleChange(input)

    }
    return <div className="search-container flex align-center"><img height = "20px" className="search-icon" src="../../../imgs/icons/search-icon.svg"/>
    <input className="search-input"type="search" name="search" id="search" placeholder="Search" onChange={inputChange} />
    <img className="search-x" src="../../../imgs/icons/x-icon.svg"/></div>
}