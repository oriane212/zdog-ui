function RangeInput(props) {
    function handle_onChange(e) {
        console.log('range input changed');
        props.onChange(e);
    }

    return (
        <div className="parameter">
            <label htmlFor={props.id}>{props.label}= {props.value}</label>
            <input type="range" id={props.id} name="parameter" value={props.value} min={props.min} max={props.max} step={props.step} disabled={props.disabled} onChange={handle_onChange}/>
        </div>
    );
}

export default RangeInput;