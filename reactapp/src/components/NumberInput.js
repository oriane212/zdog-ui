function NumberInput(props) {
    function handle_onChange(e) {
        console.log('number input changed');
        props.onChange(e);
    }

    return (
        <div className="parameter">
            <label htmlFor={props.id}>{props.label}: </label>
            <input type="number" id={props.id} name="parameter" value={props.value} min={props.min} max={props.max} step={props.step} disabled={props.disabled} onChange={handle_onChange} />
        </div>
    );
}

export default NumberInput;