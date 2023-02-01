import React from 'react';

const Form = (sectioncl, event, inputcl, ctype, id, alias, lname, val) => {
    return (
        <div>
            <section className={sectioncl}>
                {id !== null ? <label htmlFor={id}>{lname}</label> : ''}
                <input onChange={event} onClick={()=> {if(val) event();}} id={id} name={alias} type={ctype} className={inputcl} value={val} />
            </section>
        </div>
    );
};
export default Form;