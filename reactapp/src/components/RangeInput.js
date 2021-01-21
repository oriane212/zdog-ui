import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

function RangeInput(props) {
    function handle_onChange(e) {
        console.log('range input changed');
        props.onChange(e);
    }

    return (
        <div className="parameter">
            <Typography id={props.id}>{props.label}= {props.value}</Typography>
            <Slider value={props.value} min={props.min} max={props.max} step={props.step} onChange={handle_onChange} aria-labelledby={props.id}/>
        </div>
    );
}

export default RangeInput;

/*

<label htmlFor={props.id}>{props.label}= {props.value}</label>
            <input type="range" id={props.id} name="parameter" value={props.value} min={props.min} max={props.max} step={props.step} disabled={props.disabled} onChange={handle_onChange}/>

            */