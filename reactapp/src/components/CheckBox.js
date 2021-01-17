function CheckBox(props) {
    function handle_onChange(e) {
        console.log('checkbox clicked');
        props.onChange(e);
    }

    return (
        <div className="parameter">
            <input type="checkbox" id={props.id} name={props.name} checked={props.checked} onChange={handle_onChange}/>
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default CheckBox;