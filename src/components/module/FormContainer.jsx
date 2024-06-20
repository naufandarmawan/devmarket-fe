import React from 'react'



const FormContainer = ({ children, formTitle, formDescription, ...props }) => {
    return (
        <div>
            <div className="flex flex-col gap-[52px] py-[52px] justify-center">
                {(formTitle || formDescription) &&
                    <div className="flex flex-col gap-4">
                        {formTitle && <h2 className="font-semibold text-[32px] text-[#1F2A36]">{formTitle}</h2>}
                        {formDescription && <p className="font-normal text-lg text-[#46505C]">{formDescription}</p>}
                    </div>}

                <form {...props} className="flex flex-col gap-[52px]">
                    {children}
                </form>
            </div>
        </div>
            )
}

            export default FormContainer