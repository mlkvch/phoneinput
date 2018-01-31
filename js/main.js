$(document).ready(function()
{

    var telInput = $("#phone");
    telInput.intlTelInput({
        defaultCountry: 'auto',
        initialCountry: "auto",
        separateDialCode: false,
        geoIpLookup: function(callback) {
            $.get('https://ipinfo.io', function () {
            }, "json").always(function (resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });

        },
        customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
            selectedCountryPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2,false,intlTelInputUtils.numberFormat.E164);
            return selectedCountryPlaceholder;
        }
    });

    telInput.bind("change keyup input click", function() {
        if (this.value.match(/[^0-9,/+]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
    var reset = function() {
        telInput.removeClass("error");
        telInput.removeClass("check");
    };

    telInput.blur(function() {
        reset();
        if ($.trim(telInput.val())) {
            if (telInput.intlTelInput("isValidNumber")) {
                telInput.addClass("check");
            } else {
                telInput.addClass("error");
            }
        }
    });

    telInput.on("keyup change", reset);
});
